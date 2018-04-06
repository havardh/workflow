// @flow
/* eslint-env node, jest */
/* global jasmine */
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import take from './helpers/screenshot';

import { runWith, disableCache } from 'workflow-core';

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

describe('Integration tests', () => {
  let originalTimeout;
  beforeAll(() => {
    disableCache();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test(`${platform}:term:split`, async () => {
    await runWith(`${__dirname}/flows/term-split`, [], context);

    waitFor(4);

    // $FlowTodo
    expect(await take()).toMatchImageSnapshot();
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
