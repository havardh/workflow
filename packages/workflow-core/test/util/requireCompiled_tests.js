// @flow
/* eslint-env jest */
/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
import { sandbox } from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import * as Deps from '../../src/util/require-deps';
import RequireWrapper from '../../src/util/require';
import RequireCompiledWrapper from '../../src/util/requireCompiled';

chai.use(sinonChai);

const sinon = sandbox.create();

const context = {
  userFolder: '/home/user/.workflow',
  workflowFolder: '/home/user/dev/workflow/packages/workflow-core',
};

describe('load(configFile)', () => {
  beforeEach(() => {
    sinon.stub(Deps, 'read');
    sinon.stub(Deps, 'write');
    sinon.stub(Deps, 'hash');
    sinon.stub(Deps, 'ensureDirExists');
    sinon.stub(RequireWrapper, 'require');

    RequireWrapper.require = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should try reading ', () => {
    RequireCompiledWrapper.require('test.js', context);

    expect(Deps.read).to.have.been.calledWith('test.js');
  });
});
