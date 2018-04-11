/* eslint-env node */
/* eslint-disable global-require */

let M;
try {
  M = require('./dist');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    M = require('./src/index');
  } else {
    throw error;
  }
}

module.exports = M;
