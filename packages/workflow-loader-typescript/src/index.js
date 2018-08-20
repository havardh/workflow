/* eslint-env node */
/* eslint-disable import/no-dynamic-require */

export default class WorkflowLoaderTypescript {
  constructor({ config }) {
    this.config = config;
    this.registered = false;
  }

  async load(path) {
    if (!this.registered) {
      require('ts-node').register(this.config);
      this.registered = true;
    }
    return require(path);
  }
}
