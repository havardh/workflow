#!/usr/bin/env node
/* eslint-env node */
const os = require("os");
const spawn = require("child_process").spawn;

const dev = false;
const userCli = dev
  ? `${__dirname}/template`
  : `${os.homedir()}/.workflow2/cli.js`;

function cli(context) {
  context.commandFolder = process.cwd(); // eslint-disable-line no-param-reassign

  const [node, cmd, ...args] = process.argv; // eslint-disable-line no-unused-vars
  var env = Object.create(process.env);
  env.NODE_PATH = `${os.homedir()}/.workflow2/node_modules`;
  spawn(userCli, args, { stdio: "inherit", env: env });
}

if (require.main === module) {
  cli({});
}

module.exports = {
  cli
};
