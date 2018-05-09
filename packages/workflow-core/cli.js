#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require, import/no-unresolved */

function cli(context, config) {
    context.workflowFolder = __dirname;
  try {
    // $FlowTodo
    const init = require('./dist/index').init;

    init(config).cli(context);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      require('babel-register')({
        presets: [
          "flow",
          "react",
          ["env", {
            "targets": {
              "node": "current"
            }
          }]
        ],
        plugins: ["transform-object-rest-spread", "transform-class-properties"]
      });

      const init = require('./src/index').init;

      init(config).cli(context);
    } else {
      throw error;
    }
  }
}

module.exports = { cli };
