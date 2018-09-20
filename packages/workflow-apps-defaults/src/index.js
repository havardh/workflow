/* eslint-env node */
/* eslint-disable no-console */

import { baseFolder, platform, wm } from 'shared/env';
import { join } from 'path';

const defaultApps = ['Terminal', 'Browser', 'TextEditor'];

let defaults = {};

if (process.browser) {
  defaults = require('workflow-apps-html').defaults;
} else {
  const platformDefaults = (() => {
    switch (platform) {
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
        if (wm === 'i3') {
          return {
            Terminal: require('workflow-app-xterm').XTerm,
            Browser: require('workflow-app-chrome').Chrome,
            TextEditor: require('workflow-app-atom').Atom,
          };
        } else if (wm === 'wmctrl') {
          return {
            Terminal: require('workflow-app-gnometerminal').GnomeTerminal,
            Browser: require('workflow-app-firefox').Firefox,
            TextEditor: require('workflow-app-gedit').Gedit,
          };
        }
      // eslint-disable no-fallthrough
      default:
        // eslint-enable no-fallthrough
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
