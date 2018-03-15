// @flow
/* eslint-env node */
/* eslint-disable import/prefer-default-export, import/no-dynamic-require */
/* eslint-disable global-require, no-use-before-define, no-console */

import os from 'os';
import { read, write, ensureDirExists, compile, hash } from './require-deps';
import RequireWrapper from './require';
import type { Context } from '../loader/config';

let isCacheDisabled = false;

export function disableCache() {
  isCacheDisabled = true;
}

export function requireWrapper(name: string, context: Context) {
  const userFolder = (context && context.userFolder) || `${os.homedir()}/.workflow`;
  const cacheFolder = `${userFolder}/cache`;

  if (isCacheDisabled) {
    console.log('Cache disabled:', name);
    try {
      return RequireWrapper.require(name);
    } catch (e) {
      throw e;
    }
  }

  const file = read(name);

  const cacheFileName = cacheName(cacheFolder, name);
  if (!isCached(cacheFolder, name, file)) {
    console.log('Caching:', name);
    console.log('Here:', cacheFileName);
    cache(cacheFolder, name, file, compile(file));
  } else {
    console.log('cached', cacheFileName);
  }

  console.log('Reading', cacheFileName);
  try {
    return RequireWrapper.require(cacheFileName);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function isCached(cacheFolder, name, file) {
  const cacheFileName = cacheName(cacheFolder, name);
  try {
    const cachedFileContent = read(cacheFileName);

    const [first, second] = cachedFileContent.split('\n');

    return first === `// ${name}` && second === `// md5: ${hash(file)}`;
  } catch (err) {
    return false;
  }
}

function cache(cacheFolder, name, uncompiled, compiled) {
  const cacheFileName = cacheName(cacheFolder, name);


  const cacheFileContent = `// ${name}
// md5: ${hash(uncompiled)}
${compiled}
  `;

  ensureDirExists(cacheFolder);
  write(cacheFileName, cacheFileContent);
}

function cacheName(cacheFolder: string, name: string) {
  const parts = name.split('/');
  const filename = parts[parts.length - 1];

  console.log('Cache name:', `${cacheFolder}/${filename}`);

  return `${cacheFolder}/${filename}`;
}

export default { require: requireWrapper };
