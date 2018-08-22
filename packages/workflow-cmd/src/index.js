/* eslint-env node */
/* eslint-disable no-console */

/* Executed with NODE_PATH = ${baseFolder}/node_modules */
import { resolve } from 'path';
import { baseFolder } from 'shared/env';
const config =
  require(resolve(`${baseFolder}/config`)).default || require(resolve(`${baseFolder}/config`));

import * as WorkflowCore from 'workflow-core';
const workflow = new WorkflowCore.workflow(config);

if (process.argv.length < 3) {
  console.error('Usage: workflow <flow>');
  process.exit(1);
}

const [node, tool, path] = process.argv; // eslint-disable-line no-unused-vars

async function exec() {
  const absolutePath = await workflow.resolve(path);
  let flow = (await workflow.load(absolutePath)).default;
  const args = await workflow.parseArguments(flow, process.argv);
  flow = await workflow.transform(flow, { args });
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, { screen });
  await workflow.apply(layout);
}

exec()
  .then(() => console.log('done'))
  .catch(err => console.error(err));
