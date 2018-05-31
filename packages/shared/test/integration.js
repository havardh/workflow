/* eslint-env node, jest */
/* global jasmine */
import WorkflowResolverAbsolute from "workflow-resolver-absolute";
import WorkflowLoaderBabel from "workflow-loader-babel";
import WorkflowLayout from "workflow-layout";
import {platform} from "shared/env";
import take from 'shared/screenshot';

const wmPackage = {
  "win32": "workflow-wm-windows",
  "linux": "workflow-wm-i3",
  "darwin": "workflow-wm-osx"
}[platform];

if (!wmPackage) {
  throw new Error(`Could not find wm package for platform '${platform}'`)
}

const Wm = require(wmPackage);

console.log(Wm);

const configInlineFlow = {
  resolvers: [{resolve: flow => flow}],
  loader: {load: flow => ({default: flow})},
  transformers: [],
  layout: new WorkflowLayout(),
  wm: new (require({
    "win32": "workflow-wm-windows",
    "linux": "workflow-wm-i3",
    "darwin": "workflow-wm-osx"
  }[platform]))()
};

const configAbsoluteResolveFlow = {
  resolvers: [new WorkflowResolverAbsolute()],
  loader: new WorkflowLoaderBabel({config: {
    presets: [
      "flow",
      "react",
      ["env", {
        "targets": {
          "node": "current"
        }
      }]
    ],
    plugins: ["transform-object-rest-spread", "transform-class-properties"]
  }}),
  transformers: [],
  layout: new WorkflowLayout(),
  wm: new (require({
    "win32": "workflow-wm-windows",
    "linux": "workflow-wm-i3",
    "darwin": "workflow-wm-osx"
  }[platform]))()
};

function requireWorkflow(flow) {
  if (typeof flow === "string") {
    return require("workflow-core").workflow(configAbsoluteResolveFlow);
  } else {
    return require("workflow-core").workflow(configInlineFlow);
  }
}

async function seconds(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

export async function applyAndCapture(argument) {
  let workflow = requireWorkflow(argument);

  const path = await workflow.resolve(argument);
  const flow = (await workflow.load(path)).default;
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, {screen});
  await workflow.apply(layout);

  await seconds(4);

  return take();
}

export function describeFlow(name, fn) {
  describe(name, () => {

    let originalTimeout;
    beforeAll(() => {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    fn();

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

  })
}

export function testFlow(name, fn) {
  test(`${platform}:${name}}`, fn)
}
