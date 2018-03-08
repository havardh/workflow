#!/usr/bin/env node
// @flow
/* eslint-disable global-require, import/no-unresolved */
require('babel-polyfill');
require('babel-register');

function cli(context: {userFolder: string}) {
  const workflowFolder = __dirname;
  try {
    // $FlowTodo
    const run = require('./dist').default;

    run({ ...context, workflowFolder });
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      const run = require('./src/index').default;

      run({ ...context, workflowFolder });
    } else {
      throw error;
    }
  }
}

if (require.main === module) {
  cli({ userFolder: __dirname });
}

module.exports = { cli };
