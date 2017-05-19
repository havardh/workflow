// @flow
import type { WorkspaceConfig, NodeConfig } from '../index';

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
    class: transformedConfig.class,
    // $FlowTodo
    open: open(transformedConfig),
  };
}

export default function parseConfig(
  config: WorkspaceConfig | NodeConfig,
  args: {[string]:string},
) {
  if (config.root) {
    // $FlowTodo
    return { ...config, root: parseConfig(config.root, args) };
  } else if (config.children) {
    // $FlowTodo
    return { ...config, children: config.children.map(child => parseConfig(child, args)) };
  }
  return parseApp(config, args);
}
