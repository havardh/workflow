// @flow
/* eslint-env mocha */
import { it, describe } from 'mocha';
import { expect } from 'chai';

import { Atom, XTerm } from '../../apps';

const config = { percent: 1.0, open: x => x };

describe('Atom(config)', () => {
  it('should add splitv layout to config', () => {
    const input = { ...config };
    const expected = { ...config, class: 'Atom' };

    const actual = Atom(input);

    expect(actual).to.deep.equal(expected);
  });
});

describe('XTerm(config)', () => {
  it('should add splith layout to config', () => {
    const input = { ...config };
    const expected = { ...config, class: 'XTerm' };

    const actual = XTerm(input);

    expect(actual).to.deep.equal(expected);
  });
});
