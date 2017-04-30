// @flow
export type AtomConfig = {
  percent: number,
  class?: string,
  open: string | (any) => string,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export type XTermConfig = {
  percent: number,
  class?: string,
  cwd?: string | (any) => string,
  cmd?: string | (any) => string,
  args?: Array<string | (any) => string>,
  open: string | (any) => string,
};

export type AppConfig = AtomConfig | XTermConfig;

const args = {
  file: '/home/havard/cicero/hb-advisory/frontend/advisor/src/stores/saving_product_order_form_store.js',
};

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

function parseConfig(config) {
  const { open, percent } = config;
  if (typeof open === 'string') {
    return { open, percent };
  }
  const transformedConfig = {};

  Object.keys(config)
      .filter(key => key !== 'open')
      // $FlowTodo
      .forEach((key) => { transformedConfig[key] = parseValue(config[key], args); });

  return {
    percent,
    open: open(transformedConfig),
  };
}

export function Atom(config: AtomConfig): AtomConfig {
  return {
    ...parseConfig(config, args),
    class: 'Atom',
  };
}

export function XTerm(config: XTermConfig): XTermConfig {
  return {
    ...parseConfig(config, args),
    class: 'XTerm',
  };
}
