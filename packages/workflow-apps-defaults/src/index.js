/* eslint-env node */
/* eslint-disable no-console */

import { baseFolder } from 'shared/env';
import { join } from 'path';

const defaultApps = ['Terminal', 'Browser', 'TextEditor'];

let defaults = {};

if (process.browser) {
  defaults = require('workflow-apps-html').defaults;
} else {
  const platformDefaults = (() => {
    switch (process.platform) {
      case 'darwin':
        return {
          Terminal: require('workflow-app-iterm'),
          Browser: require('workflow-app-safari'),
          TextEditor: require('workflow-app-atom'),
        };
      case 'win32':
        return {
          Terminal: require('workflow-app-powershell'),
          Browser: require('workflow-app-chrome'),
          TextEditor: require('workflow-app-notepad'),
        };
      case 'linux':
        return {
          Terminal: require('workflow-app-xterm'),
          Browser: require('workflow-app-chrome'),
          TextEditor: require('workflow-app-atom'),
        };
      default:
        console.log(`Platform '${process.platform}' not supported`);
        console.log(
          'Look for an issue for your platform here: https://github.com/havardh/workflow/issues'
        );
        process.exit(0);
        break;
    }
    throw new Error('not reachable');
  })();

  const userDefaults = (() => {
    try {
      const path = join(baseFolder, 'apps', 'defaults');
      const defaultModule = require(path);

      console.log(path);
      process.exit(1);

      return defaultModule.default || defaultModule;
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      } else {
        return {};
      }
    }
  })();

  defaultApps.forEach(app => {
    defaults[app] = userDefaults[app] || platformDefaults[app];
  });
}

module.exports = {
  Browser: defaults.Browser,
  TextEditor: defaults.TextEditor,
  Terminal: defaults.Terminal,
};
