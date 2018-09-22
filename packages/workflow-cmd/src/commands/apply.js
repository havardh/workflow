/* eslint-env node */
/* eslint-disable no-console */

/* Executed with NODE_PATH = ${baseFolder}/node_modules */
import { resolve } from 'path';
import { configPath } from 'shared/env';
import * as WorkflowServerClient from 'workflow-server/client';

const { config } = require(resolve(configPath));

import * as WorkflowCore from 'workflow-core';
const workflow = new WorkflowCore.workflow(config);

export async function resolveFlow(path) {
  const absolutePath = await workflow.resolve(path);
  const { flow } = await workflow.load(absolutePath);

  if (typeof flow === 'function') {
    return await flow(workflow);
  } else {
    return flow;
  }
}

export async function apply(path, args) {
  if (args.server) {
    if (!await WorkflowServerClient.isRunning()) {
      await WorkflowServerClient.start();
    }
    await WorkflowServerClient.apply(path, args);
  } else {
    let flow = resolveFlow(path);
    flow = await workflow.transform(flow, { args });
    const screen = await workflow.screen();
    const layout = await workflow.layout(flow, { screen });
    await workflow.apply(layout);
  }
}
