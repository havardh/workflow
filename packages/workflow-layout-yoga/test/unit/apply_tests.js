/* eslint-env jest */
import yoga from 'yoga-layout';
import apply from '../../src/apply';

it('should apply alignment rules to node', () => {
  const node = { setAlignContent: jest.fn() };

  apply(node, 'alignContent', 'center');

  expect(node.setAlignContent).toBeCalledWith(yoga.ALIGN_CENTER);
});

it('should apply point rules to node', () => {
  const node = { setFlexBasis: jest.fn() };

  apply(node, 'flexBasis', 100);

  expect(node.setFlexBasis).toBeCalledWith(100);
});

it('should apply display rules to node', () => {
  const node = { setDisplay: jest.fn() };

  apply(node, 'display', 'none');

  expect(node.setDisplay).toBeCalledWith(yoga.DISPLAY_NONE);
});

it('should apply direction rules to node', () => {
  const node = { setDirection: jest.fn() };

  apply(node, 'direction', 'ltr');

  expect(node.setDirection, yoga.DIRECTION_LTR);
});

it('should apply flex direction rules to node', () => {
  const node = { setFlexDirection: jest.fn() };

  apply(node, 'flexDirection', 'row-reverse');

  expect(node.setFlexDirection, yoga.FLEX_DIRECTION_ROW_REVERSE);
});

it('should apply justify rules to node', () => {
  const node = { setJustifyContent: jest.fn() };

  apply(node, 'justifyContent', 'space-evenly');

  expect(node.setFlexDirection, yoga.JUSTIFY_SPACE_EVENLY);
});

it('should apply wrap rules to node', () => {
  const node = { setFlexWrap: jest.fn() };

  apply(node, 'flexWrap', 'nowrap');

  expect(node.setFlexWrap).toBeCalledWith(yoga.WRAP_NO_WRAP);
});

it('should apply overflow rules to node', () => {
  const node = { setOverflow: jest.fn() };

  apply(node, 'overflow', 'hidden');

  expect(node.setOverflow, yoga.OVERFLOW_HIDDEN);
});

it('should apply position rules to node', () => {
  const node = { setPositionType: jest.fn() };

  apply(node, 'position', 'absolute');

  expect(node.setPositionType, yoga.POSITION_TYPE_ABSOLUTE);
});

it('should apply border rules to node with edge', () => {
  const node = { setBorder: jest.fn() };

  apply(node, 'borderTopWidth', 200);

  expect(node.setBorder, yoga.EDGE_TOP, 200);
});

it("should apply margin rules to node with value 'auto'", () => {
  const node = { setMarginAuto: jest.fn() };

  apply(node, 'margin', 'auto');

  expect(node.setMarginAuto).toBeCalledWith(yoga.EDGE_ALL, 'auto');
});

it('should apply margin rules to node with percentage values', () => {
  const node = { setMarginPercent: jest.fn() };

  apply(node, 'marginTop', '10%');

  expect(node.setMarginPercent).toBeCalledWith(yoga.EDGE_TOP, 10);
});
