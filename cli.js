#!/usr/bin/env node
// @flow
/* eslint-disable global-require, import/no-unresolved */
require('babel-polyfill');
require('babel-register');

try {
  // $FlowTodo
  const examples = require('./dist/examples');
  // $FlowTodo
  const run = require('./dist').default;

  run(examples);
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    const examples = require('./examples');
    const run = require('./index').default;

    run(examples);
  } else {
    throw error;
  }
}
