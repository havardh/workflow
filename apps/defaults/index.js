// @flow
/* eslint-disable no-console */

import os from 'os';
import RequireWrapper from '../../util/require';

const defaultApps = [
  'Terminal',
  'Browser',
  'TextEditor',
];

const platformDefaults = (() => {
  switch (process.platform) {
    case 'darwin':
      console.log('Comming soon. Track progress at https://github.com/havardh/workflow/issues/3');
      process.exit(0);
      break;
    case 'win32':
      return require('./windows'); // eslint-disable-line global-require
    case 'linux':
      return require('./linux'); // eslint-disable-line global-require
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
