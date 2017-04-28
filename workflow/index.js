// @flow
/* eslint-disable no-console */
import type { NodeConfig } from './node';

import I3 from './wms/i3';

export type WorkspaceConfig = {
  name: string,
  args: string | Array<string>,
  root: NodeConfig,
};

function handleInvalidArguments(config, args) {
  if (typeof config === 'object' && config.length && args.length !== config.length) {
    console.log(`Invalid ARguments: Wanted ${config.join(', ')}, got ${args.join(', ')}`);
    process.exit(1);
  } else if (typeof config === 'string') {
    console.log(`Invalid Arguments: Single argument '${config}' wanted, got: '${String(args)}'`);
    process.exit(1);
  } else {
    console.log(`Unknown error with argument. config: ${String(config)}, args: '${String(args)}'`);
    process.exit(1);
  }
}

function parseArgs(config, args) { // eslint-disable-line no-shadow
  if (typeof config === 'object' && config.length && config.length === args.length) {
    const argsObject = {};
    config.forEach((arg) => { argsObject[arg] = args.shift(); });
    return argsObject;
  } else if (typeof config === 'string' && args.length === 1) {
    return { [config]: args[0] };
  }
  return handleInvalidArguments(config, args);
}

function apply(config: WorkspaceConfig, args: mixed) { // eslint-disable-line no-unused-vars
  const i3 = new I3();
  i3.apply(config);
}

const workflow = {
  run(configs: {[string]: WorkspaceConfig}) {
    const [node, index, configFile, ...args] = process.argv; // eslint-disable-line no-unused-vars

    const config = configs[configFile];

    if (!config) {
      console.log(`Could not find example: ${configFile}`);
      process.exit(1);
    }

    apply(config, parseArgs(config.args, args));
  },
};


export default workflow;
