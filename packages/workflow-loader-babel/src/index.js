/* eslint-env node */
/* eslint-disable import/no-dynamic-require */

import { transform } from 'babel-core';
import requireFromString from 'require-from-string';

export default class WorkflowLoaderBabel {
  constructor({ config }) {
    this.config = config;
    this.registered = false;
  }

  async load(arg) {
    if (!this.registered) {
      require('babel-register')(this.config);
      this.registered = true;
    }

    if (typeof arg === 'string') {
      return require(arg);
    } else if (typeof arg.path === 'string') {
      return require(arg.path);
    } else if (typeof arg.source === 'string') {
      const { code } = transform(arg.source, this.config);
      return requireFromString(code);
    } else {
      throw new Error('Could not load from arg', JSON.stringify(arg));
    }
  }
}
