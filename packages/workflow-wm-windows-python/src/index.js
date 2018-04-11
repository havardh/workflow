/* eslint-disable class-methods-use-this */
import PythonShell from 'python-shell';
import Tile from 'shared/tile';

const defaultOptions = {
  pythonPath: 'C:\\Windows\\py.exe',
};

class Windows extends Tile {

  async getDesktopRect() {
    return new Promise((resolve, reject) => {
      PythonShell.run('wms/windows/python/get_desktop_rect.py', defaultOptions, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(res[0]));
      });
    });
  }

  async setPosition({ app, position }) {
    return new Promise((resolve, reject) => {
      const { x, y, width, height } = position;
      const options = {
        ...defaultOptions,
        args: [app.pid, x, y, width, height],
      };

      PythonShell.run('wms/windows/python/set_position.py', options, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  async runCmd(app) { // eslint-disable-line class-methods-use-this
    return new Promise((resolve, reject) => {
      const options = { ...defaultOptions, args: app.open };
      PythonShell.run('wms/windows/python/open.py', options, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(res[0]).pid);
      });
    });
  }
}

export default Windows;
