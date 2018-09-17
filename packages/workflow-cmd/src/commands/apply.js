/* eslint-env node */
/* eslint-disable no-console */

/* Executed with NODE_PATH = ${baseFolder}/node_modules */
import { resolve } from 'path';
import { configPath } from 'shared/env';

const config = require(resolve(configPath)).default || require(resolve(configPath));

import * as WorkflowCore from 'workflow-core';
const workflow = new WorkflowCore.workflow(config);

export async function resolveFlow(path) {
  const absolutePath = await workflow.resolve(path);
  const { flow } = await workflow.load(absolutePath);
  return flow;
}

export async function apply(flow, args) {
  flow = await workflow.transform(flow, { args });
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, { screen });
  await workflow.apply(layout);
}
