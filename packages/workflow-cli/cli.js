#!/usr/bin/env node
const os = require('os');

const dev = true;
const userCli = dev ? `${__dirname}/template` : `${os.homedir()}/.workflow2/cli.js`;
function cli(context) {
  context.commandFolder = process.cwd();
  require(userCli).cli(context);
}

if (require.main === module) {
  cli({});
}

module.exports = {
  cli,
};
