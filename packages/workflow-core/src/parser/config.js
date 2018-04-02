import {mapValues} from "lodash";

import type { WorkspaceConfig, NodeConfig } from '../index';
import type { AppConfig } from '../apps';


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

export type App = {|
  pid?: string,
  percent: number,
  class: string,
  name: string,
  open: string,
  jxa: any,
|};

function parseApp(config: AppConfig, args): App {
  const { open, ...rest } = config;

  const transformedConfig = mapValues(rest, value => parseValue(value, args));

  return { ...transformedConfig, open };
}

export type LayoutNode = {|
  percent: number,
  layout: string,
  children: Array<Node> // eslint-disable-line no-use-before-define
|};

export type Node = LayoutNode | App;

export type Config = {|
  name: string,
  root: Node
|};

function parseNode(config: NodeConfig, args: {[string]:string}): Node {
  if (config.children) {
    return {
      percent: config.percent,
      layout: config.layout,
      children: config.children.map(child => parseNode(child, args)),
    };
  }
  return parseApp(config, args);
}

export default function parseConfig(
  config: WorkspaceConfig,
  args: {[string]:string},
): Config {
  return {
    name: config.name,
    root: parseNode(config.root, args),
  };
}
