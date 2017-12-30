// @flow
/* eslint-env jest */
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import take from './helpers/screenshot';

import { runWith } from '../../index';

expect.extend({ toMatchImageSnapshot });

const platform = process.platform;

test(`${platform}:term:split`, async () => {
  await runWith('term-split', []);

  expect(await take()).toMatchImageSnapshot();
});
