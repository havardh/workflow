#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require, import/no-unresolved */

function cli(context) {
    context.workflowFolder = __dirname;
  try {
    // $FlowTodo
    const run = require('./index').default;
    run(context);
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

      const run = require('./src/index').default;

      run(context);
    } else {
      throw error;
    }
  }
}

if (require.main === module) {
  cli({ userFolder: __dirname });
}

module.exports = { cli };
