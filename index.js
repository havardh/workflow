// @flow
/* eslint-disable no-console */
// import I3 from './wms/i3';
import Windows from './wms/windows';
import parseArgs from './parser/args';
import parseConfig from './parser/config';
import load from './loader/config';

import type { SplitVConfig, SplitHConfig } from './layout';
import type { AppConfig } from './apps';
import type { Args } from './parser/args';

export type NodeConfig = SplitVConfig | SplitHConfig | AppConfig;
export type WorkspaceConfig = {
  name: string,
  args: Args,
  root: NodeConfig,
};

function apply(config) { // eslint-disable-line no-unused-vars
  const wm = new Windows();
  return wm.apply(config);
}

export function Workspace(config: WorkspaceConfig) {
  return config;
}

export default async function run() {
  try {
    const [node, index, configFile, ...args] = process.argv; // eslint-disable-line no-unused-vars

    const config = load(configFile);
    const parameters = parseArgs(config.args, args);
    const layout = parseConfig(config, parameters);
    await apply(layout);
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error(String(error));
    } else {
      console.error(error.stack);
    }
    process.exit(1);
  }
}
