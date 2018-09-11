/* eslint-env node */
/* eslint-disable import/no-dynamic-require */

import * as ts from 'typescript';
import requireFromString from 'require-from-string';

export default class WorkflowLoaderTypescript {
  constructor({ config }) {
    this.config = config;
    this.registered = false;
  }

  async load(arg) {
    if (!this.registered) {
      require('ts-node').register(this.config);
      this.registered = true;
    }

    if (typeof arg === 'string') {
      return require(arg);
    } else if (typeof arg.path === 'string') {
      return require(arg.path);
    } else if (typeof arg.source === 'string') {
      const { compilerOptions } = this.config;

      let { outputText: code } = ts.transpileModule(arg.source, {
        ...this.config,
        compilerOptions: { module: ts.ModuleKind.CommonJS, ...compilerOptions },
      });

      return requireFromString(code);
    } else {
      throw new Error('Could not load from arg', JSON.stringify(arg));
    }
  }
}
