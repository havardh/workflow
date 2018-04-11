import PythonShell from 'python-shell';
import shell from 'shelljs';

import Tile from 'shared/tile';

export default class Ubuntu extends Tile {

  async getDesktopRect() { // eslint-disable-line class-methods-use-this
    /* eslint-disable no-useless-escape */
    const result = shell.exec('xrandr | grep \'\*\' | awk \'{print $1}\'', { silent: true });

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

  async setPosition({ app, position }) {  // eslint-disable-line class-methods-use-this
    let windowId;
    while (!windowId) {
      const result = shell.exec(`wmctrl -l -p | grep ${app.pid} | awk '{ print $1 }'`,
        { silent: true },
      );

      windowId = result.stdout.replace('\n', '');
    }

    const { x, y, width, height } = position;
    shell.exec(
      `wmctrl -i -r ${windowId} -e 0,${x},${y},${width},${height}`,
      { silent: true },
    );

    return Promise.resolve({});
  }

  async runCmd(app) { // eslint-disable-line class-methods-use-this
    return new Promise((resolve, reject) => {
      const options = {
        args: app.open.split(' '),
        pythonPath:
        '/usr/bin/python',
        mode: 'json',
      };
      const script = new PythonShell('wms/windows/open.py', options);

      script.on('message', (data) => {
        resolve(data.pid);
      });
      script.on('error', (error) => {
        reject(error);
      });
      script.end(() => {
        // resolve(pid);
      });
    });
  }

}
