// @flow
/* eslint-env jest */
/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
import { sandbox } from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import * as Deps from '../../util/require-deps';
import RequireWrapper from '../../util/require';
import RequireCompiledWrapper from '../../util/requireCompiled';

chai.use(sinonChai);

const sinon = sandbox.create();

describe('load(configFile)', () => {
  beforeEach(() => {
    sinon.stub(Deps, 'read');
    sinon.stub(Deps, 'hash');
    sinon.stub(RequireWrapper, 'require');

    RequireWrapper.require = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should try reading ', () => {
    RequireCompiledWrapper.require('test.js');

    expect(Deps.read).to.have.been.calledWith('test.js');
  });
});
