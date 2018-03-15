/* eslint-env node */
/* eslint-disable global-require */

let workflowReact;
try {
  workflowReact = require('./dist');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    workflowReact = require('./src/index');
  } else {
    throw error;
  }
}


module.exports = workflowReact;
