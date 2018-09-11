import { testApp } from '../../src/app';
import { testLayout } from '../../src/layout';
import { testWm } from '../../src/wm';
import { testNode } from '../../src';

jest.mock('../../src/app', () => ({ testApp: jest.fn() }));
jest.mock('../../src/layout', () => ({ testLayout: jest.fn() }));
jest.mock('../../src/wm', () => ({ testWm: jest.fn() }));

test('testNode(unknown) should throw error', () => {
  const app = { type: 'unknown' };

  expect(() => testNode(app)).toThrowErrorMatchingSnapshot();
});

test('testNode(app) should call testApp', () => {
  const app = { type: 'app' };

  testNode(app);

  expect(testApp).toBeCalledWith(app);
});

test('testNode(layout) should call testLayout', () => {
  const layout = { type: 'layout' };

  testNode(layout);

  expect(testLayout).toBeCalledWith(layout);
});

test('testNode(wm) should call testWm', () => {
  const wm = { type: 'wm' };

  testNode(wm);

  expect(testWm).toBeCalledWith(wm);
});
