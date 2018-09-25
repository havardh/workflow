/* eslint-env node */
const { WorkflowWmWindowsPython } = require('workflow-wm-windows-python');

const { config } = require('../workflow-home-example/config.js');

module.exports = {
  config: {
    ...config,
    wm: new WorkflowWmWindowsPython(),
  },
};
