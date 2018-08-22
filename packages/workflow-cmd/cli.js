#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */

const { existsSync } = require('fs');
const { join } = require('path');

if (existsSync(join(__dirname, 'dist'))) {
  module.exports = require('./dist/cli');
} else {
  module.exports = require('./src/cli');
}
