#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */
import { join } from 'path';
import * as ipc from "./ipc";
import {findAllApps} from "shared/tree"
import fs from "fs"

console.log();
console.log();
console.log("--- workflow-server --- ");
console.error();
console.error();
console.error("--- workflow-server --- ");

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

  apply(path, args)
    .then(() => console.log("done"))
    .catch(e => console.error(e));
});

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

let oldFlow = null;
export async function apply(path, args) {
  const absolutePath = await workflow.resolve(path);
  const screen = await workflow.screen();

  let { flow } = await workflow.load(absolutePath);

  flow = await workflow.transform(flow, { args });
  flow = await workflow.layout(flow, { screen });

  flow = await workflow.register(flow);

  flow = await workflow.apply(flow, async app => workflow.waitFor(app));
  console.log(JSON.stringify(flow, 0, 2));
  await workflow.updateRegister(flow);
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
process.on('uncaughtException', (e) => {
  console.error(e);
  process.exit(1);
});

workflow.startServer();

