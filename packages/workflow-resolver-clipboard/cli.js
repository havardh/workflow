/* eslint-env node */
/* eslint-disable no-console */

const babelConfig = {
  config: {
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
  },
};

const typescriptConfig = {
  config: {
    compilerOptions: {
      experimentalDecorators: true,
    },
  },
};

const WorkflowWmAuto = require('workflow-wm-auto');
const WorkflowResolverClipboard = require('workflow-resolver-clipboard');
const WorkflowLoaderBabel = require('workflow-loader-babel');
const WorkflowLoaderTypescript = require('workflow-loader-typescript');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');

const config = {
  resolvers: [new WorkflowResolverClipboard()],
  loaders: [
    { loader: new WorkflowLoaderBabel(babelConfig) },
    { loader: new WorkflowLoaderTypescript(typescriptConfig) },
  ],
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWmAuto(),
};

const workflow = require('workflow-core').workflow(config);

async function run() {
  const path = process.argv[2];
  const args = { clipboard: true };
  const absolutePath = await workflow.resolve(path, { args });
  let flow = await workflow.load(absolutePath, { args });
  flow = await workflow.transform(flow.default, { args });

  const screen = await workflow.screen({ args });
  const layout = await workflow.layout(flow, { screen, args });

  await workflow.apply(layout, { args });
}

run().catch(err => console.error(err));
