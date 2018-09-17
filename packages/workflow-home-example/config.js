/* eslint-env node */
const { join } = require('path');
const { requireAsJson } = require('shared/json');
const WorkflowResolverRelative = require('workflow-resolver-relative');
const WorkflowLoaderBabel = require('workflow-loader-babel');
const WorkflowLoaderTypescript = require('workflow-loader-typescript');
const WorkflowTransformerApplyArgumentsToFields = require('workflow-transformer-apply-arguments-to-fields');
const WorkflowLayout = require('workflow-layout');
const WorkflowWm = require('workflow-wm-auto');

const babelConfig = requireAsJson('../../.babelrc');
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
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWm(),
};
