/* eslint-env node */
import { execSync } from 'child_process';
import args from './args';
import { which } from './shell';
import os from 'os';
import { dirname, join } from 'path';

export const platform = process.platform;

function isRunningI3() {
  try {
    execSync("i3-msg 'exec echo 1'", { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isRunningWmctrl() {
  return which('wmctrl');
}

export const wm = (() => {
  switch (platform) {
    case 'win32':
    case 'darwin':
      return 'default';
    case 'linux': {
      if (isRunningI3()) {
        return 'i3';
      } else if (isRunningWmctrl()) {
        return 'wmctrl';
      }
      return 'unknown';
    }
  }
  return 'unknown';
})();

export const dev = process.env.WORKFLOW_DEV_MODE === 'true';
export const homedir = process.env.WORKFLOW_HOME;
export const devhomedir = process.env.WORKFLOW_DEV_HOME;

const { config } = args(process.argv).named;

export let configPath;
export let baseFolder;
(() => {
  if (dev) {
    if (devhomedir) {
      baseFolder = devhomedir;
      configPath = join(devhomedir, 'config.js');
    } else {
      baseFolder = join(__dirname, '..', '..', 'workflow-template', 'config.js');
      configPath = join(baseFolder, 'config.js');
    }
  } else {
    if (config) {
      baseFolder = dirname(config);
      configPath = config;
    } else if (homedir) {
      baseFolder = homedir;
      configPath = join(baseFolder, 'config.js');
    } else {
      configPath = join(os.homedir(), '.workflow', 'config.js');
      baseFolder = `${os.homedir()}/.workflow`;
    }
  }
})();
