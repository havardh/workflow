/* eslint-env node */
import shell from 'shelljs';
import { difference } from 'lodash';
import execa from 'execa';

import { findAllApps } from 'shared/tree';
const timeout = n => new Promise(resolve => setTimeout(resolve, n));
export class WorkflowWmWmctrl {
  async screen() {
    // eslint-disable-line class-methods-use-this
    /* eslint-disable no-useless-escape */
    const result = shell.exec("xrandr | grep '*' | awk '{print $1}'", { silent: true });

    const widthXHeight = result.stdout.replace('\n', '');

    const width = parseInt(widthXHeight.split('x')[0], 10);
    const height = parseInt(widthXHeight.split('x')[1], 10);

    return Promise.resolve({
      left: 64,
      top: 24,
      width: width - 64,
      height: height - 24,
    });
  }

  async getListOfWindowIds(className) {
    const { stdout } = await execa('wmctrl', ['-lx']);

    const lines = stdout.split('\n');

    const candidates = lines.filter(line => line.includes(className));

    return candidates.map(line => line.split(' ')[0]);
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    const run = async ({ cmd, args, className, position }) => {
      if (className) {
        const before = await this.getListOfWindowIds(className);

        execa(cmd, args, { stdio: 'ignore' });

        await timeout(2000);

        const after = await this.getListOfWindowIds(className);

        const windowIds = difference(after, before);

        for (let windowId of windowIds) {
          this.setPosition({ windowId, position });
        }
      } else {
        const { pid } = await execa(cmd, args, { stdio: 'ignore' });
        this.setPosition({ pid, position });
      }
    };

    const context = {
      platform: 'linux',
      wm: 'wmctrl',
      run,
    };

    for (let app of apps) {
      await app.open(app, context, app.children);
    }
  }

  async setPosition({ pid, windowId, position }) {
    while (!windowId) {
      const result = shell.exec(`wmctrl -l -p | grep ${pid} | awk '{ print $1 }'`, {
        silent: true,
      });

      windowId = result.stdout.replace('\n', '');
    }

    const { left, top, width, height } = position;
    await execa('wmctrl', [
      '-i',
      '-r',
      windowId,
      '-e',
      `0,${Math.floor(left)},${Math.floor(top)},${Math.floor(width)},${Math.floor(height)}`,
    ]);
  }
}
