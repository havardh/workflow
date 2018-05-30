/* eslint-env node, jest */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import {describeFlow, testFlow, applyAndCapture} from "shared/test/integration";

describeFlow('Integration tests', () => {

  testFlow(`term:split`, async () => {
    const path = `${__dirname}/flows/term-split.js`;

    expect(await applyAndCapture(path)).toMatchImageSnapshot();
  });
});
