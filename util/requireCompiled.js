// @flow
/* eslint-disable import/prefer-default-export, import/no-dynamic-require */
/* eslint-disable global-require, no-use-before-define, no-console */

import os from 'os';
import { read, write, compile, hash } from './require-deps';
import RequireWrapper from './require';

const cacheFolder = `${os.homedir()}/.workflow/cache`;

export function requireWrapper(name: string) {
  const file = read(name);

  if (!isCached(name, file)) {
    console.log('Caching:', name);
    console.log('Here:', cacheName(name));
    cache(name, file, compile(file));
  } else {
    console.log('cached', cacheName(name));
  }

  console.log('Reading', cacheName(name));
  try {
    return RequireWrapper.require(cacheName(name));
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function isCached(name, file) {
  const cacheFileName = cacheName(name);
  try {
    const cachedFileContent = read(cacheFileName);

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

  write(cacheFileName, cacheFileContent);
}

function cacheName(name: string) {
  const parts = name.split('/');
  const filename = parts[parts.length - 1];

  console.log('Cache name:', `${cacheFolder}/${filename}`);

  return `${cacheFolder}/${filename}`;
}

export default { require: requireWrapper };
