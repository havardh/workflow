/* eslint-disable class-methods-use-this */
import PythonShell from 'python-shell';

import findAllApps from 'shared/tree';

const defaultOptions = {
  pythonPath: 'C:\\Windows\\py.exe',
};

class Windows {

  async screen() {
    return new Promise((resolve, reject) => {
      PythonShell.run('wms/windows/python/get_desktop_rect.py', defaultOptions, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(res[0]));
      });
    });
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    for (let app of apps) {
      const pid = await this.runCmd(app);
      await this.setPosition({...app, pid});
    }
  }

  async setPosition({ pid, position }) {
    return new Promise((resolve, reject) => {
      const { top, left, width, height } = position;
      const options = {
        ...defaultOptions,
        args: [pid, left, top, width, height],
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
