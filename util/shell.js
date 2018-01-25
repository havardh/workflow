// @flow
/* eslint-disable import/prefer-default-export */

import shell from 'shelljs';

export function exec(cmd: string, async: boolean = true) {
  return shell.exec(cmd, { silent: true, async });
}

export function which(cmd: string) {
  return shell.exec(`which ${cmd}`, { silent: true, async: false });
}
