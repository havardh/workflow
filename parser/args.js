// @flow
/* eslint-disable no-console */
export type Args = string | Array<string>

class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

export class InvalidArgument extends BaseError {
  config: Args;
  args: Array<string>;

  constructor(
    message: string,
    config: Args,
    args: Array<string>,
  ) {
    super(message);
    this.message = message;
    this.config = config;
    this.args = args;
  }
}

export class InvalidConfig extends BaseError {
  config: mixed;

  constructor(message: string, config: mixed) {
    super(message);
    this.message = message;
    this.config = config;
  }
}

function validateArguments(config, args) {
  if (typeof config === 'object' && config !== null && config.length) {
    if (config.length !== args.length) {
      throw new InvalidArgument(
        `multiple arguments (${config.length}) '${config.join(' ')}' wanted,
        got (${args.length}) '${args.join(' ')}'`,
        config,
        args,
      );
    }
  } else if (typeof config === 'string') {
    if (args.length === 0) {
      throw new InvalidArgument(
        `single argument '${config}' wanted, got: '${String(args)}'`,
        config,
        args,
      );
    } else if (args.length > 1) {
      throw new InvalidArgument(
        `single argument '${config}' wanted, got: '${args.length}'`,
        config,
        args,
      );
    }
  } else {
    throw new InvalidConfig(
      `expected config.args to be of type 'string' or 'array, got: ${typeof config}'`, config);
  }
}

export default function parseArgs(
  config: Args,
  args: Array<string>,
): {[string]: string} { // eslint-disable-line no-shadow
  validateArguments(config, args);

  if (typeof config === 'object' && config.length && config.length === args.length) {
    const argsObject = {};
    config.forEach((arg) => { argsObject[String(arg)] = args.shift(); });
    return argsObject;
  } else if (typeof config === 'string' && args.length === 1) {
    return { [config]: args[0] };
  }
  return {};
}
