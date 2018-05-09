// @flow
/* eslint-env node, jest */
/* global jasmine */
import WorkflowResolverAbsolute from "workflow-resolver-absolute";
import WorkflowLoaderBabel from "workflow-loader-babel";
import WorkflowTransformerApplyArgumentsToFields from "workflow-transformer-apply-arguments-to-fields";
import { init } from 'workflow-core';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import take from './helpers/screenshot';


expect.extend({ toMatchImageSnapshot });

const platform = process.platform;

function waitFor(seconds) {
  const waitTill = new Date(new Date().getTime() + (seconds * 1000));

  while (waitTill > new Date());
}

const context = {
  userFolder: '/home/user/.workflow',
  workflowFolder: '/home/user/dev/workflow/packages/workflow-core',
};

const config = {
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
};

const defaultConfig = {
  resolvers: [new WorkflowResolverAbsolute()],
  loader: new WorkflowLoaderBabel({config}),
  transformers: [new WorkflowTransformerApplyArgumentsToFields()]
};


function platformConfig(platform) {
  const wms = {
    "win32": "workflow-wm-windows",
    "linux": "workflow-wm-i3",
    "darwin": "workflow-wm-osx"
  };

  // $FlowSuppress
  const Wm = require(wms[platform]);
  return { ...defaultConfig, wm: new Wm() };
}

describe('Integration tests', () => {
  let originalTimeout;
  let workflow;
  beforeAll(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    workflow = init(platformConfig(platform));
  });

  test(`${platform}:term:split`, async () => {
    await workflow.run(`${__dirname}/flows/term-split.js`, [], context);

    waitFor(4);

    // $FlowTodo
    expect(await take()).toMatchImageSnapshot();
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
