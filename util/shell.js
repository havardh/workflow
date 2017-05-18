// @flow
/* eslint-disable import/prefer-default-export */

import shell from 'shelljs';

export function exec(cmd: string) {
  return shell.exec(cmd);
}
