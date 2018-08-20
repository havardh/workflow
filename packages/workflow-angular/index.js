/* eslint-env node */
/* eslint-disable global-require */

try {
  module.exports = require('./dist');
} catch (error) {
  console.log(error);
  if (error.code === 'MODULE_NOT_FOUND') {
    module.exports = require('./src/index');
  } else {
    throw error;
  }
}
