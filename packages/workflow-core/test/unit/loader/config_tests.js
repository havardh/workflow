// @flow
/* eslint-env jest */
/* eslint-disable no-unused-expressions, import/no-extraneous-dependencies */
import { sandbox } from 'sinon';

import RequireWrapper from '../../../src/util/requireCompiled';
import load from '../../../src/loader/config';

const sinon = sandbox.create();

function ModuleNotFound() {
  this.code = 'MODULE_NOT_FOUND';
}

function FileReadFailed() {
  this.code = 'ENOENT';
}

const context = {
  userFolder: '/home/user/.workflow',
  workflowFolder: '/home/user/dev/workflow/packages/workflow-core',
};

describe('load(configFile)', () => {
  const expectedFile = { file: 'content' };

  const path = __dirname.replace('/test/unit', '/src');
  beforeEach(() => {
    sinon.stub(RequireWrapper, 'require');
    sinon.stub(console, 'log');

    // $FlowTodo
    RequireWrapper.require.throws(new ModuleNotFound());
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw error when all loaders fails', () => {
    const fn = () => load('file.js', context);
    expect(fn).toThrowErrorMatchingSnapshot();
  });

  it('should throw loading error when reading all files fails', () => {
    // $FlowTodo
    RequireWrapper.require.throws(new FileReadFailed());

    const fn = () => load('file.js', context);
    expect(fn).toThrowErrorMatchingSnapshot();
  });

  it('should rethrow error when loaded module fails', () => {
    // $FlowTodo
    RequireWrapper.require.throws(new Error('Module error'));

    const fn = () => load('file.js', context);

    expect(fn).toThrowErrorMatchingSnapshot();
  });

  it('should require absolute path', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/path/to/file.js')
      .returns({ default: expectedFile });

    const file = load('/path/to/file.js', context);

    expect(file).toEqual(expectedFile);
  });

  it('should append missing .js to absolute path', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/path/to/file.js')
      .returns({ default: expectedFile });

    const file = load('/path/to/file', context);

    expect(file).toEqual(expectedFile);
  });

  it('should require file from ~/.workflow', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/home/user/.workflow/flows/file.js')
      .returns({ default: expectedFile });

    const file = load('file.js', context);

    expect(file).toEqual(expectedFile);
  });

  it('should append missing .js when require from ~/.workflow', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs('/home/user/.workflow/flows/file.js')
      .returns({ default: expectedFile });

    const file = load('file', context);

    expect(file).toEqual(expectedFile);
  });

  it('should require file from workflow examples', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs(`${path}/../../examples/file.js`)
      .returns({ default: expectedFile });

    const file = load('file.js', context);

    expect(file).toEqual(expectedFile);
  });

  it('should append missing .js when require from workflow examples', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs(`${path}/../../examples/file.js`)
      .returns({ default: expectedFile });

    const file = load('file.js', context);

    expect(file).toEqual(expectedFile);
  });

  it('should require in specific order', () => {
    RequireWrapper.require
      // $FlowTodo
      .withArgs(`${path}/../../examples/file.js`)
      .returns({ default: expectedFile });

    load('file.js', context);

    // $FlowTodo
    const calls = RequireWrapper.require.getCalls();

    expect(calls[0].args[0]).toEqual('file.js');
    expect(calls[1].args[0]).toEqual('/home/user/.workflow/flows/file.js');
    expect(calls[2].args[0]).toEqual(`${path}/../../examples/file.js`);
  });
});
