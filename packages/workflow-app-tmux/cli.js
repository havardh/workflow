/* eslint-env node */
/* eslint-disable no-console */

const { join } = require('path');

const babelConfig = {
  presets: [
    'flow',
    'react',
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['transform-object-rest-spread', 'transform-class-properties'],
};

const WorkflowWmTerminal = require('workflow-wm-terminal');
const WorkflowResolverRelative = require('workflow-resolver-relative');
const WorkflowLoaderBabel = require('workflow-loader-babel');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');

const config = {
  resolvers: [new WorkflowResolverRelative({ path: join(__dirname, 'flow') })],
  loader: new WorkflowLoaderBabel({ config: babelConfig }),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWmTerminal(),
};

const workflow = require('workflow-core').workflow(config);

async function run() {
  const path = process.argv[2];
  const absolutePath = await workflow.resolve(path);
  let flow = await workflow.load(absolutePath);
  const args = {};
  flow = await workflow.transform(flow.default, { args });

  await workflow.apply(flow);
}

run().catch(err => console.error(err));
