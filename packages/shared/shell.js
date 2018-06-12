/* eslint-disable import/prefer-default-export */
/* eslint-env node */

import shell from 'shelljs';

export function exec(cmd, async = true) {
  return shell.exec(cmd, { silent: true, async: async });
}

export function which(cmd) {
  return shell.exec(`which ${cmd}`, { silent: true, async: false });
}
