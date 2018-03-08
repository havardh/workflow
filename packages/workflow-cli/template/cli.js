#!/usr/bin/env node
function cli(context) {
  context.userFolder = __dirname;

  require('workflow-core/cli').cli(context);
}

if (require.main === module) {
  cli({});
}

module.exports = { cli };
