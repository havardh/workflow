/* eslint-env node */
/* eslint-disable class-methods-use-this */
import PythonShell from 'python-shell';
import path from 'path';
import { findAllApps } from 'shared/tree';
import difference from 'lodash.difference';
import { exec } from './powershell';
import { promisify } from 'util';

function resolvePython(file) {
  return path.join(__dirname, path.sep, file);
}

const defaultOptions = {
  pythonPath: 'python',
};

const PythonShellRunAsync = promisify(PythonShell.run);
async function runPython(file, options = {}) {
  return PythonShellRunAsync(resolvePython(file), { ...defaultOptions, ...options });
}

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

export class WorkflowWmWindowsPython {
  async screen() {
    const [rect] = await runPython('get_desktop_rect.py');
    return JSON.parse(rect);
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
    const options = {
      args: [pid, left, top, width, height],
    };
    return await runPython('set_position.py', options);
  }

  async getListOfWindows(className) {
    const options = {
      args: [className],
    };

    const [windowIds] = await runPython('get_list_of_windows.py', options);

    return JSON.parse(windowIds);
  }

  async setPositionByWindowId(windowId, left, top, width, height) {
    const options = {
      args: [windowId, left, top, width, height],
    };

    await runPython('set_position_by_window_id.py', options);
  }
}
