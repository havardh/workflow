#!/usr/bin/env node
const os = require("os");
const spawn = require("child_process").spawn;

const dev = false;
const userCli = dev
  ? `${__dirname}/template`
  : `${os.homedir()}/.workflow2/cli.js`;
function cli(context) {
  context.commandFolder = process.cwd();

  const [node, cmd, ...args] = process.argv;
  var env = Object.create(process.env);
  env.NODE_PATH = `${os.homedir()}/.workflow2/node_modules`;
  const cli = spawn(userCli, args, {
    stdio: "inherit",
    env: env
  });
}

if (require.main === module) {
  cli({});
}

module.exports = {
  cli
};
