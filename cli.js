#!/usr/bin/env node
// @flow
/* eslint-disable global-require, import/no-unresolved */
require('babel-polyfill');
require('babel-register');

try {
  // $FlowTodo
  const run = require('./dist').default;

  run();
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    const run = require('./index').default;

    run();
  } else {
    throw error;
  }
}
