// @flow
/* eslint-env jest */
import { expect } from 'chai';

import { Atom, XTerm } from '../../../src/apps/linux';

describe('Atom', () => {
  it('should have class "Atom"', () => {
    expect(Atom.xClass).to.equal('Atom');
  });
});

describe('XTerm', () => {
  it('should have class "XTerm"', () => {
    expect(XTerm.xClass).to.equal("XTerm");
  });
});
