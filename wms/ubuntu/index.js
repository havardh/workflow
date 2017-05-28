import PythonShell from 'python-shell';

import Tile from '../tile';
import shell from 'shelljs';

const leftPadding = 64;
const topPadding = 24;

export default class Ubuntu extends Tile {

  async getDesktopRect() {
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

  async setPosition({ app, position }) {
    console.log(app);

    let windowId;
    while (!windowId) {
      const result = shell.exec(`wmctrl -l -p | grep ${app.pid} | awk '{ print $1 }'`,
        { silent: true },
      );

      windowId = result.stdout.replace('\n', '');
    }

    const { x, y, width, height } = position;
    console.log(`wmctrl -i -r ${windowId} -e ${x},${y},${width},${height}`);
    const result = shell.exec(
      `wmctrl -i -r ${windowId} -e 0,${x},${y},${width},${height}`,
      { silent: true },
    );

    console.log(result);

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
        console.log('message');
        resolve(data.pid);
      });
      script.on('error', (error) => {
        console.log('error');
        reject(error);
      });
      script.end(() => {
        console.log('end');
        // resolve(pid);
      });
    });
  }

}
