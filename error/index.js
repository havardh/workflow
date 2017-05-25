import type { Args } from '../parser/args';

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
