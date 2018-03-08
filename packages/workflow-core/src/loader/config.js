// @flow
/* eslint-disable no-console, global-require, no-restricted-syntax, import/no-dynamic-require */
import type { WorkspaceConfig } from '../index';
import RequireWrapper from '../util/requireCompiled';
import { ConfigLoadError } from '../error';

export type Context = {
  userFolder: string,
  workflowFolder: string,
};

export default function load(name: string, context: Context): WorkspaceConfig {
  if (!name.endsWith('.js')) {
    name += '.js'; // eslint-disable-line no-param-reassign
  }

  const { userFolder } = context;

  const options = [
    name,
    `${userFolder}/flows/${name}`,
    //`${__dirname}/../../examples/${name}`,
  ];

  for (const option of options) {
    try {
      const config = RequireWrapper.require(option, context).default;
      console.log(`Loaded: ${option}`);
      return config;
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND' && error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  console.log(`Could not load '${name}'`);
  console.log('Tried:', options);

  throw new ConfigLoadError(`Could not load ${name}`, options);
}
