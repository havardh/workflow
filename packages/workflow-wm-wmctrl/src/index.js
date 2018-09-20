/* eslint-env node */
import PythonShell from 'python-shell';
import shell from 'shelljs';

import { findAllApps } from 'shared/tree';

export class WorkflowWmWmctrl {
  async screen() {
    // eslint-disable-line class-methods-use-this
    /* eslint-disable no-useless-escape */
    const result = shell.exec("xrandr | grep '*' | awk '{print $1}'", { silent: true });

    const widthXHeight = result.stdout.replace('\n', '');

    const width = parseInt(widthXHeight.split('x')[0], 10);
    const height = parseInt(widthXHeight.split('x')[1], 10);

    return Promise.resolve({
      x: 64,
      y: 24,
      width: width - 64,
      height: height - 24,
    });
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    const { run } = this;

    const context = {
      platform: 'linux',
      wm: 'wmctrl',
      run,
    };

    for (let app of apps) {
      const pid = await this.runCmd(app);
      await this.setPosition({ ...app, pid });
    }
  }

  async run({ cmd, args, position }) {
    const { pid } = execa(cmd, args);
    this.setPosition({ pid, position });
  }

  async setPosition({ pid, position }) {
    // eslint-disable-line class-methods-use-this
    let windowId;
    while (!windowId) {
      const result = shell.exec(`wmctrl -l -p | grep ${pid} | awk '{ print $1 }'`, {
        silent: true,
      });

      windowId = result.stdout.replace('\n', '');
    }

    const { left, top, width, height } = position;
    await execa('wmctrl', ['-i', '-r', windowId, '-e', `0,${left},${top},${width},${height}`]);
  }
}
