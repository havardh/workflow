// @flow
/* eslint-env node */
/* eslint-disable no-console */
import { which } from 'shared/shell';

import type { Config } from '../parser/config';

const platform = process.platform;

let Wm = () => {
  console.log('Platform not supported');
  process.exit(0);
};

import osx from "workflow-wm-osx";
import windows from "./windows/index";
import i3 from "workflow-wm-i3";
import ubuntu from "./ubuntu/index";

switch (platform) {
  case 'darwin':
    Wm = osx;
    break;
  case 'win32':
    Wm = windows;
    break;
  case 'linux':
    if (which('i3-msg').code === 0) {
      Wm = i3; // eslint-disable-line global-require
    } else if (which('wmctrl').code === 0) {
      Wm = ubuntu; // eslint-disable-line global-require
    } else {
      console.log('Could not find supported windows manager controller');
      console.log('');
      console.log(`Platform '${platform}' supports the following wm controllers`);
      console.log(' - i3-msg');
      console.log(' - wmctrl');
      console.log('');
      console.log('If you are using Ubuntu and are unsure which to use.');
      console.log('Install wmctrl with `sudo apt-get install wmctrl`');
      console.log('');
      console.log('If you are using a different windows manager not listed here on linux,');
      console.log('be sure to check out the issue page on github and add an issue if your wm is missing.');
      console.log('Look for it here: https://github.com/havardh/workflow/issues');
      console.log('');
      process.exit(1);
    }
    break;
  default:
    console.log(`Platform '${platform}' not supported`);
    console.log('Look for an issue for your platform here: https://github.com/havardh/workflow/issues');
    process.exit(0);
    break;
}

const wm = new Wm();
export default {
  async apply(config: Config) {
    return wm.apply(config);
  },
};
