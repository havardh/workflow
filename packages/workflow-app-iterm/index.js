/* eslint-env node */
/* eslint-disable global-require */

let iterm;
try {
  iterm = require('./dist');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    iterm = require('./src/index');
  } else {
    throw error;
  }
}


module.exports = iterm;
