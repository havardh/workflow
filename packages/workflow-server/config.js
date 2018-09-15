/* eslint-env node */
const { join } = require('path');
const WorkflowResolverRelative = require('workflow-resolver-relative');
const WorkflowLoaderBabel = require('workflow-loader-babel');
const WorkflowParserArguments = require('workflow-parser-arguments');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');
const WorkflowWmI3 = require('workflow-wm-i3');

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
  resolvers: [new WorkflowResolverRelative({ path: join(__dirname, 'flows') })],
  loaders: [{ loader: new WorkflowLoaderBabel({ config }) }],
  argumentParser: new WorkflowParserArguments(),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWmI3(),
};
