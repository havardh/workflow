/* eslint-env node, jest */
/* global jasmine */
import WorkflowResolverAbsolute from "workflow-resolver-absolute";
import WorkflowLoaderBabel from "workflow-loader-babel";
import WorkflowLayout from "workflow-layout";
import {platform} from "shared/env";
import take from 'shared/screenshot';

const Wm = require({
  "win32": "workflow-wm-windows",
  "linux": "workflow-wm-i3",
  "darwin": "workflow-wm-osx"
}[platform]);

function requireWorkflow(flow) {
  if (typeof flow === "string") {
    return require("workflow-core").workflow({
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
      wm: new Wm()
    });
  } else {
    return require("workflow-core").workflow({
      resolvers: [{resolve: flow => flow}],
      loader: {load: flow => ({default: flow})},
      transformers: [],
      layout: new WorkflowLayout(),
      wm: new Wm()
    });
  }
}

async function seconds(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

async function applyAndCapture(argument) {
  let workflow = requireWorkflow(argument);

  const path = await workflow.resolve(argument);
  const flow = (await workflow.load(path)).default;
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, {screen});
  await workflow.apply(layout);

  await seconds(4);

  workflow = null;

  return take();
}

async function clearWorkspace() {
  const wm = new Wm();
  if (wm.minimizeAll) {
    wm.minimizeAll();
    await seconds(4);
  }
}

function describeFlow(name, fn) {
  describe(name, () => {

    let originalTimeout;
    beforeAll(() => {
      jest.resetModules();
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });

    fn();

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

  })
}

function testFlow(name, fn) {
  test(`${platform}:${name}}`, async () => {
    await clearWorkspace();
    await fn(applyAndCapture);
  });
}

function registerTestCases(name, test_file) {
  describeFlow(name, () => {
    for (let [name, test] of Object.entries(test_file.default)) {
      testFlow(name, test);
    }
  });
}

export function registerIntegrationTests(tests) {
  for (let [name, test_file] of Object.entries(tests)) {
    registerTestCases(name, test_file);
  }
}
