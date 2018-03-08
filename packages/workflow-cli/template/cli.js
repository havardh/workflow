#!/usr/bin/env node
/* eslint-disable global-require */

function cli(context) {
  context.userFolder = __dirname; // eslint-disable-line no-param-reassign

  require('workflow-core/cli').cli(context); // eslint-disable-line import/no-unresolved
}

if (require.main === module) {
  cli({});
}

module.exports = { cli };
