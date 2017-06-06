// @flow
/* eslint-disable import/prefer-default-export */

import shell from 'shelljs';

export function exec(cmd: string) {
  return shell.exec(cmd, { silent: true, async: true });
}

export function which(cmd: string) {
  return shell.exec(`which ${cmd}`, { silent: true, async: false });
}
