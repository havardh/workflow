/* eslint-env node */
/* eslint-disable import/no-dynamic-require */

export default class WorkflowLoaderBabel {

  constructor({config}) {
    this.config = config;
    this.registered = false;
  }

  async load(path) {
    if (!this.registered) {
      require("babel-register")(this.config);
      this.registered = true;
    }
    return require(path);
  }

}
