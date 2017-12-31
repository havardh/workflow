// @flow
/* eslint-env jest */
/* global jasmine */
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import take from './helpers/screenshot';

import { runWith } from '../../index';

expect.extend({ toMatchImageSnapshot });

const platform = process.platform;

function waitFor(seconds) {
  const waitTill = new Date(new Date().getTime() + (seconds * 1000));

  while (waitTill > new Date());
}

describe('Integration tests', () => {
  let originalTimeout;
  beforeAll(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test(`${platform}:term:split`, async () => {
    await runWith('term-split', []);

    waitFor(2);

    // $FlowTodo
    expect(await take()).toMatchImageSnapshot();
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
