/* eslint-disable no-console */
const platform = process.platform;

let Wm = () => {
  console.log('Platform not supported');
  process.exit(0);
};

console.log(platform);

switch (platform) {
  case 'darwin':
    console.log('Comming soon. Track progress at https://github.com/havardh/workflow/issues/3');
    process.exit(0);
    break;
  case 'win32':
    Wm = require('./windows').default; // eslint-disable-line global-require
    break;
  case 'linux':
    console.log('require i3');
    Wm = require('./i3').default; // eslint-disable-line global-require
    break;
  default:
    console.log(`Platform '${platform}' not supported`);
    console.log('Look for an issue for your platform here: https://github.com/havardh/workflow/issues');
    process.exit(0);
    break;
}

export default new Wm();
