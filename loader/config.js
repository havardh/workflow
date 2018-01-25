// @flow
/* eslint-disable no-console, global-require, no-restricted-syntax, import/no-dynamic-require */
import os from 'os';
import type { WorkspaceConfig } from '../index';
import RequireWrapper from '../util/require';
import { ConfigLoadError } from '../error';

export default function load(name: string): WorkspaceConfig {
  const options = [
    name,
    `${os.homedir()}/.workflow/${name}`,
    `${__dirname}/../examples/${name}`,
  ];

  for (const option of options) {
    try {
      const config = RequireWrapper.require(option).default;
      console.log(`Loaded: ${option}`);
      return config;
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      }
    }
  }

  console.log(`Could not load '${name}'`);
  console.log('Tried:');

  throw new ConfigLoadError(`Could not load ${name}`, options);
}
