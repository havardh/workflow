#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */

try {
  module.exports = require('./dist/cli');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    require('babel-register');
    module.exports = require('./src/cli');
  } else {
    throw error;
  }
}
