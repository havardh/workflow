// @flow
/* eslint-env jest */
/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
import os from 'os';
import { sandbox } from 'sinon';

import RequireWrapper from '../../util/require';
import load from '../../loader/config';

const sinon = sandbox.create();

describe('load(configFile)', () => {
  const expectedFile = { file: 'content' };

  beforeEach(() => {
    sinon.stub(RequireWrapper, 'require');
    sinon.stub(process, 'cwd');
    sinon.stub(os, 'homedir');
    sinon.stub(console, 'log');

    // $FlowTodo
    RequireWrapper.require.throws(new Error());

    os.homedir.returns('/home/user');
    process.cwd.returns('/home/user/dev/workflow');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should require file directly', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/path/to/file.js')
      .returns(expectedFile);

    const file = load('/path/to/file.js');

    expect(file).toEqual(expectedFile);
  });

  it('should require file from ~/.workflow', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/home/user/.workflow/file.js')
      .returns(expectedFile);

    const file = load('file.js');

    expect(file).toEqual(expectedFile);
  });

  it('should require file from workflow examples', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/home/user/dev/workflow/examples/file.js')
      .returns(expectedFile);

    const file = load('file.js');

    expect(file).toEqual(expectedFile);
  });

  it('should require in specific order', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/home/user/dev/workflow/examples/file.js')
      .returns(expectedFile);

    load('file.js');

    // $FlowTodo
    const calls = RequireWrapper.require.getCalls();

    expect(calls[0].args[0]).toEqual('file.js');
    expect(calls[1].args[0]).toEqual('/home/user/.workflow/file.js');
    expect(calls[2].args[0]).toEqual('/home/user/dev/workflow/examples/file.js');
  });
});
