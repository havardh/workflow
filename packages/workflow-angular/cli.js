/* eslint-env node */
/* eslint-disable no-console */
const { join } = require('path');
const WorkflowResolverRelative = require('workflow-resolver-relative');
const WorkflowResolverAbsolute = require('workflow-resolver-absolute');
const WorkflowLoaderTypescript = require('workflow-loader-typescript');
const WorkflowParserArguments = require('workflow-parser-arguments');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');
const WorkflowWm = require('workflow-wm-i3');

const typescriptConfig = {
  config: {
    compilerOptions: {
      experimentalDecorators: true,
    },
  },
};

const config = {
  resolvers: [
    new WorkflowResolverAbsolute(),
    new WorkflowResolverRelative({ path: process.cwd() }),
    new WorkflowResolverRelative({ path: join(__dirname, 'flows') }),
  ],
  loaders: [{ loaders: new WorkflowLoaderTypescript(), test: '*.ts' }],
  argumentParser: new WorkflowParserArguments(),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWm(),
};

const workflow = require('workflow-core').workflow(config);

async function run() {
  const path = process.argv[2];
  const absolutePath = await workflow.resolve(path);
  let flow = await workflow.load(absolutePath);
  const args = {};
  flow = await workflow.transform(await flow.default, { args });
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, { screen });

  await workflow.apply(layout);
}

run().catch(err => console.error(err));
