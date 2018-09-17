import YogaLayout, { Node } from 'yoga-layout';

import { apply } from './apply';

function layout(node, { position }) {
  const { top, left, width, height } = position;

  const root = createYogaNode(node);
  root.yogaNode.setPosition(YogaLayout.EDGE_TOP, top);
  root.yogaNode.setPosition(YogaLayout.EDGE_LEFT, left);
  root.yogaNode.setWidth(width);
  root.yogaNode.setHeight(height);
  root.yogaNode.calculateLayout(width, height, YogaLayout.DIRECTION_LTR);

  const tree = calculate(root);

  return {
    ...tree,
    type: 'layout',
    layout: 'absolute',
  };
}

function wrapInRelative(node) {
  return {
    type: 'layout',
    layout: 'relative',
    position: node.position,
    children: [node],
  };
}

function calculate(node) {
  if (node && !node.yogaNode) {
    return { ...node };
  } else {
    return {
      ...node,
      position: node.yogaNode.getComputedLayout(),
      children: (node.children || []).map(calculate).map(wrapInRelative),
    };
  }
}

function createYogaNode(node) {
  const yogaNode = Node.create();

  const { style } = node;
  for (let [key, value] of Object.entries(style || {})) {
    apply(yogaNode, key, value);
  }

  const children = [];
  for (let i in node.children) {
    const child = createYogaNode(node.children[i]);
    children.push(child);
    yogaNode.insertChild(child.yogaNode, i);
  }

  return { ...node, yogaNode, children };
}

export const Yoga = { type: 'layout', layout, style: {}, children: [] };
