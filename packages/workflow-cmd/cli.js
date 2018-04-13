#!/usr/bin/env node
/* eslint-env node */
const os = require("os");
const spawn = require("child_process").spawn;


const dev = process.env.WORKFLOW_DEV_MODE;
const baseFolder = dev
  ? `${__dirname}/../workflow-template`
  : `${os.homedir()}/.workflow`;

if (dev) {
  console.log("Running in dev mode");
  console.log(`From: ${baseFolder}`);
}

function cli(context) {
  context.commandFolder = process.cwd(); // eslint-disable-line no-param-reassign

  const [node, cmd, ...args] = process.argv; // eslint-disable-line no-unused-vars

  var env = Object.create(process.env);
  env.NODE_PATH = `${baseFolder}/node_modules`;
  spawn(`${baseFolder}/cli.js`, args, { stdio: "inherit", env: env });
}

if (require.main === module) {
  cli({});
}

module.exports = {
  cli
};
