#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */

/* Executed with NODE_PATH = ${baseFolder}/node_modules */

const {baseFolder} = require("shared/env");
const config = require(`${baseFolder}/config`).default;

const workflow = require("workflow-core").workflow(config);

const [node, path] = process.argv; // eslint-disable-line no-unused-vars

async function exec() {
  const absolutePath = await workflow.resolve(path);
  let flow = await workflow.load(absolutePath);
  const args = await workflow.parseArguments(flow, process.argv);
  flow = await workflow.transform(flow, {args});
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, {screen});
  await workflow.apply(layout);
}

exec()
  .then(() => console.log("done"))
  .catch(err => console.error(err));
