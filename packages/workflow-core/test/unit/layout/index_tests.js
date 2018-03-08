// @flow
/* eslint-env jest */
import { expect } from 'chai';

import { SplitV, SplitH } from '../../../src/layout';

const config = { percent: 0.1, children: [] };

describe('SplitV(config)', () => {
  it('should add splitv layout to config', () => {
    const input = { ...config };
    const expected = { ...config, layout: 'splitv' };

    const actual = SplitV(input);

    expect(actual).to.deep.equal(expected);
  });
});

describe('SplitH(config)', () => {
  it('should add splith layout to config', () => {
    const input = { ...config };
    const expected = { ...config, layout: 'splith' };

    const actual = SplitH(input);

    expect(actual).to.deep.equal(expected);
  });
});
