import { testTransformer } from '../../src';

testTransformer({
  Transformer: class Transformer {
    async transformBefore(node) {
      return node;
    }
    async transformAfter(node) {
      return node;
    }
  },
});
