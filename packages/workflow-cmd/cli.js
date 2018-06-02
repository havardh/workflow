#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */
const spawn = require("cross-spawn");
const {join} = require("path");
const {dev, baseFolder} = require("shared/env");

if (dev) {
  console.log("Running in dev mode");
  console.log(`From: ${baseFolder}`);
}

function cli() {
  const [node, cmd, ...args] = process.argv; // eslint-disable-line no-unused-vars

  var env = Object.create(process.env);
  env.NODE_PATH = `${baseFolder}/node_modules`;
  spawn(join(__dirname, "index.js"), args, { stdio: "inherit", env: env });
}

if (require.main === module) {
  cli({});
}
