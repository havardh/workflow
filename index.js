// @flow
import config from './examples/js-test';
import workflow from './workflow';

const [node, index, configFile, ...args] = process.argv; // eslint-disable-line no-unused-vars

class InvalidArgument {
  cause = null;

  constructor(cause = 'InvalidArgument') {
    this.cause = cause;
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
  if (args.length && config.length) {
    throw new InvalidArgument(`Invalid arguments. Arugments ${args.join(' ')} did not match config: ${config.join(' ')}`);
  } else {
    throw new InvalidArgument();
  }
}

workflow.apply(config, parseArgs(config.args, args));
