/* eslint-env node */
/* eslint-disable global-require */

let workflowCore;
try {
  workflowCore = require('./dist');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    workflowCore = require('./src/index');
  } else {
    throw error;
  }
}


module.exports = workflowCore;
