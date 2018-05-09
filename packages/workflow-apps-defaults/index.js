// @flow
/* eslint-env node */
/* eslint-disable no-console */

const os = require('os');

const defaultApps = [
  'Terminal',
  'Browser',
  'TextEditor',
];

let defaults = {};

// $FlowSuppress
if (process.browser) {
  defaults = require("workflow-apps-html").defaults;
} else {
  const platformDefaults = (() => {
    switch (process.platform) {
      case 'darwin':
        return require("workflow-apps-osx").defaults;
      case 'win32':
        return require("workflow-apps-windows").defaults;
      case 'linux':
        return require("workflow-apps-linux").defaults;
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
      // $FlowSuppress
      return require(`${os.homedir()}/.workflow/apps/defaults`);
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      } else {
        return {};
      }
    }
  })();


  defaultApps.forEach((app) => {
    defaults[app] = userDefaults[app] || platformDefaults[app];
  });
}

module.exports = {
  Browser: defaults.Browser,
  TextEditor: defaults.TextEditor,
  Terminal: defaults.Terminal
}
