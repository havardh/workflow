import mapValues from 'lodash.mapvalues';

function parseValue(value, args) {
  if (typeof value === 'function') {
    return value(args);
  } else if (typeof value === 'object' && value.length) {
    return value.map(v => parseValue(v, args));
  }
  return value;
}

export class WorkflowTransformerApplyArgumentsToFields {
  async transformBefore() {}
  async transformAfter(node, { args }) {
    switch (node.type) {
      case 'app': {
        const { open, update, ...rest } = node;
        return { open, update, ...mapValues(rest, v => parseValue(v, args)) };
      }
      default:
        return node;
    }
  }
}
