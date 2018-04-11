// @flow
/* eslint-env node */
/* eslint-disable no-console */
import os from 'os';
import RequireWrapper from '../../util/require';

const defaultApps = [
  'Terminal',
  'Browser',
  'TextEditor',
];

import * as windows from "./windows";
import * as osx from "./osx";
import * as linux from "./linux";

const platformDefaults = (() => {
  switch (process.platform) {
    case 'darwin':
      return osx;
    case 'win32':
      return windows;
    case 'linux':
      return linux;
    default:
      console.log(`Platform '${process.platform}' not supported`);
      console.log('Look for an issue for your platform here: https://github.com/havardh/workflow/issues');
      process.exit(0);
      break;
  }
  throw new Error('not reachable');
})();


const userDefaults = (() => {
  try {
    return RequireWrapper.require(`${os.homedir()}/.workflow/apps/defaults`);
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    } else {
      return {};
    }
  }
})();

const defaults = {};

defaultApps.forEach((app) => {
  defaults[app] = userDefaults[app] || platformDefaults[app];
});

export const Terminal = defaults.Terminal;
export const Browser = defaults.Browser;
export const TextEditor = defaults.TextEditor;
