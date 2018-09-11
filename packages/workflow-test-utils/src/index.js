import { testApp } from './app';
import { testLayout } from './layout';
import { testWm } from './wm';
export * from './transformer';

export function testNode(node) {
  switch (node.type) {
    case 'app':
      return testApp(node);
    case 'layout':
      return testLayout(node);
    case 'wm':
      return testWm(node);
    default:
      throw new Error('Unknown node type ' + node.type);
  }
}
