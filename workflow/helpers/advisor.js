// @flow
/* eslint-disable import/prefer-default-export */
export function getTestFile(file: string): string { // eslint-disable-line no-unused-vars
  return file
    .replace('src', 'test')
    .replace('.js', '_tests.js');
}
