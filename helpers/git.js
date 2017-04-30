// @flow
/* eslint-disable import/prefer-default-export */
import shell from 'shelljs';

export function projectRoot(file: string): string { // eslint-disable-line no-unused-vars
  const parts = file.split('/');
  parts.pop();
  const folder = parts.join('/');

  const result = shell.exec(
    `cd ${folder} && git rev-parse --show-toplevel`,
    { silent: true },
  );

  return result.stdout.replace('\n', '');
}
