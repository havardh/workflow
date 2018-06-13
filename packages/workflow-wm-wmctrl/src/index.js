/* eslint-env node */
import PythonShell from 'python-shell';
import shell from 'shelljs';

import { findAllApps } from 'shared/tree';

class Wmctrl {
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

    for (let app of apps) {
      const pid = await this.runCmd(app);
      await this.setPosition({ ...app, pid });
    }
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
    shell.exec(`wmctrl -i -r ${windowId} -e 0,${left},${top},${width},${height}`, { silent: true });

    return Promise.resolve({});
  }

  async runCmd(app) {
    // eslint-disable-line class-methods-use-this
    return new Promise((resolve, reject) => {
      const options = {
        args: app.open.split(' '),
        pythonPath: '/usr/bin/python',
        mode: 'json',
      };
      const script = new PythonShell('wms/windows/open.py', options);

      script.on('message', data => {
        resolve(data.pid);
      });
      script.on('error', error => {
        reject(error);
      });
      script.end(() => {
        // resolve(pid);
      });
    });
  }
}

module.exports = Wmctrl;
