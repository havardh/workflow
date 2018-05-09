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
  constructor(message, config, args) {
    super(message);
    this.message = message;
    this.config = config;
    this.args = args;
  }
}

export class InvalidConfig extends BaseError {
  constructor(message, config) {
    super(message);
    this.message = message;
    this.config = config;
  }
}

export class ConfigLoadError extends BaseError {
  constructor(message, options) {
    super(message);
    this.options = options;
  }
}
