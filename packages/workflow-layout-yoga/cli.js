#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */

const {join} = require("path");


const babelConfig = {
  presets: [
    "flow",
    "react",
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  plugins: [
    "transform-object-rest-spread",
    "transform-class-properties"
  ]
};

const WorkflowResolverRelative = require("workflow-resolver-relative");
const WorkflowLoaderBabel = require("workflow-loader-babel");
const WorkflowTransformerApplyArgumentsToFields = require("workflow-transformer-apply-arguments-to-fields");
const WorkflowLayout = require("workflow-layout");
const WorkflowWmI3 = require("workflow-wm-i3");

const config = {
  resolvers: [new WorkflowResolverRelative({path: join(__dirname, "flows")})],
  loader: new WorkflowLoaderBabel({config: babelConfig}),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],
  layout: new WorkflowLayout(),
  wm: new WorkflowWmI3()
};


const workflow = require("workflow-core").workflow(config);

async function exec() {
  const path = process.argv[2];
  const absolutePath = await workflow.resolve(path);
  let flow = await workflow.load(absolutePath);
  const args = {};
  flow = await workflow.transform(flow.default, {args});

  const screen = await workflow.screen();
  flow = await workflow.layout(flow, {screen});

  await workflow.apply(flow);
}

exec()
  .then(() => console.log("done"))
  .catch(err => console.error(err));
