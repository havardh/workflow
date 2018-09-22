#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */
import { join } from 'path';
import * as ipc from './ipc';
import fs from "fs"

const { config } = require(join(__dirname, '../../workflow-home-example/config.js'));

if (fs.existsSync("/tmp/workflow-server.lock")) {
  console.error("Lock file already exists: /tmp/workflow-server.lock");
  console.error("Are you already running workflow-server?");
  console.error("If not, you can delete the lock file and try again.");

  process.exit(1);
} else {
  fs.writeFileSync("/tmp/workflow-server.lock", "workflow-server: " + process.pid + "\n");
}

console.log("workflow-server started with pid:", process.pid);

import * as WorkflowCore from 'workflow-core';
const workflow = new WorkflowCore.workflow(config);

ipc.on('workflow.apply', (data, socket) => {
  const { path, args } = JSON.parse(data);

  console.log({path, args});

  apply(path, args)
    .then(() => console.log("done"))
    .catch(e => console.error(e));
});

let first = true;
let oldFlow = null;
async function apply(path, args) {
  const absolutePath = await workflow.resolve(path);
  let { flow } = await workflow.load(absolutePath);
  if (typeof flow === 'function') {
    flow = await flow(workflow);
  }
  if (first) {
    flow = await workflow.transform(flow, { args: {} });
    const screen = await workflow.screen();
    const layout = await workflow.layout(flow, { screen });
    await workflow.apply(layout);
    first = false;
    oldFlow = layout;
  }
}

function exitHandler() {
  try {
    fs.unlinkSync("/tmp/workflow-server.lock");
    console.log("Lock file was released: /tmp/workflow-server")
  } catch (e) {
    console.error("Could not delete lock file: /tmp/workflow-server");
    console.error(e);
  }
}

process.stdin.resume()
process.on('SIGTERM', exitHandler)
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
//process.on('uncaughtException', exitHandler);

workflow.startServer();

