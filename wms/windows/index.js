import PythonShell from 'python-shell';
import Tile from '../tile';
import { exec } from '../../util/shell';

class Windows extends Tile {

  async getDesktopRect() { // eslint-disable-line class-methods-use-this
    return new Promise((resolve, reject) => {
      PythonShell.run('wms/windows/get_desktop_rect.py', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(res[0]));
      });
    });
  }

  async setPosition({ app, position }) { // eslint-disable-line class-methods-use-this
    return new Promise((resolve, reject) => {
      const { x, y, width, height } = position;
      const options = {
        args: [app.name, x, y, width, height],
      };

      PythonShell.run('wms/windows/set_position.py', options, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  runCmd(app) { // eslint-disable-line class-methods-use-this
    exec(app.open);
  }
}

export default Windows;
