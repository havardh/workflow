#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */

const { existsSync } = require('fs');
const { join } = require('path');

if (existsSync(join(__dirname, 'dist'))) {
  require('./dist/cli');
} else {
  require('./src/cli');
}
