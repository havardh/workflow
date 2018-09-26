/* eslint-env node */
/* eslint-disable class-methods-use-this */
import PythonShell from 'python-shell';
import path from 'path';
import { findAllApps } from 'shared/tree';
import difference from 'lodash.difference';
import { exec } from './powershell';

const defaultOptions = {
  pythonPath: 'python',
};

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

export class WorkflowWmWindowsPython {
  async screen() {
    return new Promise((resolve, reject) => {
      PythonShell.run(
        path.join(__dirname, path.sep, 'get_desktop_rect.py'),
        defaultOptions,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(res[0]));
        }
      );
    });
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    const { startOnPositionByWindowClass, startOnPositionByReturnedPid } = this;

    const context = {
      platform: 'win32',
      wm: 'default',
      startOnPositionByWindowClass: startOnPositionByWindowClass.bind(this),
      startOnPositionByReturnedPid: startOnPositionByReturnedPid.bind(this),
    };

    for (let app of apps) {
      await app.open(app, context, app.children);
    }
  }

  async startOnPositionByReturnedPid({ cmd, args, position }) {
    const pid = await exec(`Start-Process ${cmd} -PassThru "${args.join(' ')}"`);
    const { left, top, width, height } = position;
    this.setPosition(pid, top, left, width, height);
  }

  async startOnPositionByWindowClass({ cmd, args, className, position }) {
    const before = await this.getListOfWindows(className);
    await exec(`Start-Process ${cmd} -PassThru "${args.join(' ')}"`);

    await timeout(1000);

    const after = await this.getListOfWindows(className);

    const windowIds = difference(after, before);
    const { left, top, width, height } = position;
    for (let windowId of windowIds) {
      this.setPositionByWindowId(windowId, left, top, width, height);
    }
  }

  async setPosition(pid, top, left, width, height) {
    return new Promise((resolve, reject) => {
      const options = {
        ...defaultOptions,
        args: [pid, left, top, width, height],
      };
      PythonShell.run(path.join(__dirname, path.sep, 'set_position.py'), options, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  async getListOfWindows(className) {
    return new Promise((resolve, reject) => {
      const options = {
        ...defaultOptions,
        args: [className],
      };

      PythonShell.run(
        path.join(__dirname, path.sep, 'get_list_of_windows.py'),
        options,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(res[0]));
        }
      );
    });
  }

  async setPositionByWindowId(windowId, left, top, width, height) {
    return new Promise((resolve, reject) => {
      const options = {
        ...defaultOptions,
        args: [windowId, left, top, width, height],
      };

      PythonShell.run(
        path.join(__dirname, path.sep, 'set_position_by_window_id.py'),
        options,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  }
}
