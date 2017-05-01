// @flow
/* eslint-disable no-console */
import type { SplitVConfig, SplitHConfig } from './layout';
import type { AppConfig } from './apps';

import I3 from './wms/i3';

export type NodeConfig = SplitVConfig | SplitHConfig | AppConfig;

type Args = string | Array<string>

export type WorkspaceConfig = {
  name: string,
  args: Args,
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

function parseArgs(
  config: Args,
  args: Array<string>,
): {[string]: string} { // eslint-disable-line no-shadow
  if (typeof config === 'object' && config.length && config.length === args.length) {
    const argsObject = {};
    config.forEach((arg) => { argsObject[String(arg)] = args.shift(); });
    return argsObject;
  } else if (typeof config === 'string' && args.length === 1) {
    return { [config]: args[0] };
  }
  // $FlowTodo
  return handleInvalidArguments(config, args);
}


function parseValue(value, args) { // eslint-disable-line no-shadow
  if (typeof value === 'function') {
    return value(args);
  } else if (typeof value === 'number' || typeof value === 'string') {
    return value;
  } else if (typeof value === 'object' && value.length) {
    return value.map(v => parseValue(v, args));
  }
  return value;
}

function parseApp(config, args) {
  const { open, percent } = config;
  if (typeof open === 'string') {
    return { open, percent };
  }
  const transformedConfig = {};

  Object.keys(config)
      .filter(key => key !== 'open')
      .forEach((key: string) => { transformedConfig[key] = parseValue(config[key], args); });

  return {
    percent,
    open: open(transformedConfig),
  };
}

function parseConfig(config: WorkspaceConfig | NodeConfig, args: {[string]:string}) {
  if (config.root) {
    // $FlowTodo
    return { ...config, root: parseConfig(config.root, args) };
  } else if (config.children) {
    // $FlowTodo
    return { ...config, children: config.children.map(child => parseConfig(child, args)) };
  }
  return parseApp(config, args);
}

function apply(config) { // eslint-disable-line no-unused-vars
  const i3 = new I3();
  i3.apply(config);
}

export default function run(configs: {[string]: WorkspaceConfig}) {
  const [node, index, configFile, ...args] = process.argv; // eslint-disable-line no-unused-vars

  const config = configs[configFile];

  if (!config) {
    console.log(`Could not find example: ${configFile}`);
    process.exit(1);
  }

  const parameters = parseArgs(config.args, args);
  const layout = parseConfig(config, parameters);
  apply(layout);
}
