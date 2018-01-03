// @flow
/* eslint-disable no-console */

const platform = (() => {
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
      console.log(`Platform '${platform}' not supported`);
      console.log('Look for an issue for your platform here: https://github.com/havardh/workflow/issues');
      process.exit(0);
      break;
  }
  throw new Error('not reachable');
})();

export const Terminal = platform.Terminal;
export const Browser = platform.Browser;
export const TextEditor = platform.TextEditor;
