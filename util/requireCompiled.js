// @flow
/* eslint-disable import/prefer-default-export, import/no-dynamic-require, global-require, no-use-before-define */

import os from 'os';
import { readFileSync, writeFileSync } from 'fs';
import { transform } from 'babel-core';
import crypto from 'crypto';

const cacheFolder = `${os.homedir()}/.workflow/cache`;

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

export function requireWrapper(name: string) {
  const file = read(name);

  if (!isCached(name, file)) {
    console.log('Caching:', name);
    console.log('Here:', cacheName(name));
    cache(name, file, compile(file));
  }

  return requireCached(name);
}

function read(name: string): string {
  return readFileSync(name, { encoding: 'utf8' });
}

function compile(file: string) {
  return transform(file, babelOptions).code;
}

function isCached(name, file) {
  const cacheFileName = cacheName(name);
  try {
    const cachedFileContent = readFileSync(cacheFileName, { encoding: 'utf8' });

    const [first, second] = cachedFileContent.split('\n');

    return first === `// ${name}` && second === `// md5: ${hash(file)}`;
  } catch (err) {
    return false;
  }
}

function cache(name, uncompiled, compiled) {
  const cacheFileName = cacheName(name);


  const cacheFileContent = `// ${name}
// md5: ${hash(uncompiled)}
${compiled}
  `;

  writeFileSync(cacheFileName, cacheFileContent);
}

function cacheName(name: string) {
  const parts = name.split('/');
  const filename = parts[parts.length - 1];

  return `${cacheFolder}/${filename}`;
}

function hash(file) {
  return crypto
    .createHash('md5')
    .update(file)
    .digest('hex');
}

function requireCached(name: string) {
  // $FlowSuppress
  return require(cacheName(name));
}

export default { require: requireWrapper };
