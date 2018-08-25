/* eslint-env node */
const { join } = require('path');
const WorkflowResolverRelative = require('workflow-resolver-relative');
const WorkflowResolverAbsolute = require('workflow-resolver-absolute');
const WorkflowLoaderBabel = require('workflow-loader-babel');
const WorkflowParserArguments = require('workflow-parser-arguments');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');
const WorkflowWm = require('{{workflow.wm.name}}');

const config = {
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

module.exports = {
  resolvers: [
    new WorkflowResolverAbsolute(),
    new WorkflowResolverRelative({ path: process.cwd() }),
    new WorkflowResolverRelative({ path: join(__dirname, 'flows') }),
  ],
  loaders: [{ loader: new WorkflowLoaderBabel({ config }), test: '*.js' }],
  argumentParser: new WorkflowParserArguments(),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWm(),
};
