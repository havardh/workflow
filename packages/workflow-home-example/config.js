/* eslint-env node */
const { join } = require('path');
const WorkflowResolverRelative = require('workflow-resolver-relative');
const WorkflowLoaderBabel = require('workflow-loader-babel');
const WorkflowLoaderTypescript = require('workflow-loader-typescript');
const WorkflowParserArguments = require('workflow-parser-arguments');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');
const WorkflowWm = require('workflow-wm-auto');

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

module.exports = {
  resolvers: [new WorkflowResolverRelative({ path: join(process.cwd(), 'flows') })],
  loaders: [
    {
      loader: new WorkflowLoaderBabel(babelConfig),
      filter: path => path.match(/.*\.js/),
    },
    {
      loader: new WorkflowLoaderTypescript(typescriptConfig),
      filter: path => path.match(/.*\.ts/),
    },
  ],
  argumentParser: new WorkflowParserArguments(),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWm(),
};
