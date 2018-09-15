/* eslint-env node */
/* eslint-disable global-require */

try {
  module.exports = require('./dist/client');
} catch (error) {
  console.log(error);

  if (error.code === 'MODULE_NOT_FOUND') {
    module.exports = require('./src/client');
  } else {
    throw error;
  }
}
