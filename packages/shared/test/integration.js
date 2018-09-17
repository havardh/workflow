/* eslint-env node, jest */
/* global jasmine */
import { WorkflowResolverAbsolute } from 'workflow-resolver-absolute';
import { WorkflowLoaderBabel } from 'workflow-loader-babel';
import { WorkflowLayout } from 'workflow-layout';
import { platform } from 'shared/env';
import { requireAsJson } from 'shared/json';
import { take } from 'shared/screenshot';
import { WorkflowWmAuto } from 'workflow-wm-auto';

const config = requireAsJson('.babelrc');

function requireWorkflow(flow) {
  if (typeof flow === 'string') {
    return require('workflow-core').workflow({
      resolvers: [new WorkflowResolverAbsolute()],
      loaders: [{ loader: new WorkflowLoaderBabel({ config }) }],
      transformers: [],
      layout: new WorkflowLayout(),
      wm: new WorkflowWmAuto(),
    });
  } else {
    return require('workflow-core').workflow({
      resolvers: [{ resolve: flow => flow }],
      loaders: [{ loader: { load: flow => ({ flow }) }, test: /.*/ }],
      transformers: [],
      layout: new WorkflowLayout(),
      wm: new WorkflowWmAuto(),
    });
  }
}

async function seconds(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

async function applyAndCapture(argument) {
  let workflow = requireWorkflow(argument);

  const path = await workflow.resolve(argument);
  const { flow } = await workflow.load(path);
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, { screen });
  await workflow.apply(layout);

  await seconds(5);

  workflow = null;

  return take();
}

async function clearWorkspace() {
  const wm = new WorkflowWmAuto();
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
  });
}

function testFlow(name, fn) {
  test(`${platform}:${name}}`, async () => {
    await clearWorkspace();
    await fn(applyAndCapture);
  });
}

function registerTestCases(name, testCases) {
  describeFlow(name, () => {
    for (let [name, test] of Object.entries(testCases)) {
      testFlow(name, test);
    }
  });
}

export function registerIntegrationTests(tests) {
  for (let [name, test_file] of Object.entries(tests)) {
    registerTestCases(name, test_file);
  }
}
