/* eslint-env jest */
export function testTransformer({ Transformer }) {
  const instance = new Transformer();

  if (instance.transformBefore) {
    test('transformBefore should a function', () => {
      expect(typeof instance.transformBefore).toEqual('function');
    });

    test('transformBefore should return node on unknown type', async () => {
      const node = { type: 'unknown' };
      expect(await instance.transformBefore(node)).toBe(node);
    });
  }

  if (instance.transformAfter) {
    test('transformAfter should a function', () => {
      expect(typeof instance.transformAfter).toEqual('function');
    });

    test('transformAfter should return node on unknown type', async () => {
      const node = { type: 'unknown' };
      expect(await instance.transformAfter(node)).toBe(node);
    });
  }
}
