// @flow
import { readFileSync, writeFileSync } from 'fs';
import { transform } from 'babel-core';
import crypto from 'crypto';

const babelOptions = {
  presets: [
    'es2015',
  ],
  plugins: [
    'transform-flow-strip-types',
    'transform-object-rest-spread',
    'transform-async-to-generator',
    'transform-react-jsx',
  ],
};

export function read(name: string): string {
  return readFileSync(name, { encoding: 'utf8' });
}

export function write(name: string, content: string) {
  writeFileSync(name, content);
}

export function compile(file: string) {
  try {
    return transform(file, babelOptions).code;
  } catch (e) {
    throw e;
  }
}

export function hash(file: string) {
  return crypto
    .createHash('md5')
    .update(file)
    .digest('hex');
}
