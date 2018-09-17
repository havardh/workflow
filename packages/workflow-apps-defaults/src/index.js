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
          Terminal: require('workflow-app-iterm').ITerm,
          Browser: require('workflow-app-safari').Safari,
          TextEditor: require('workflow-app-textedit').TextEdit,
        };
      case 'win32':
        return {
          Terminal: require('workflow-app-powershell').PowerShell,
          Browser: require('workflow-app-chrome').Chrome,
          TextEditor: require('workflow-app-notepad').Notepad,
        };
      case 'linux':
        return {
          Terminal: require('workflow-app-xterm').XTerm,
          Browser: require('workflow-app-chrome').Chrome,
          TextEditor: require('workflow-app-atom').Atom,
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
      const { defaults } = require(path);

      return defaults || {};
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
