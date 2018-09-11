/* eslint-env jest */
export function testTransformer({ Transformer }) {
  const instance = new Transformer();
  if (typeof instance.transformBefore === 'function') {
    test('transformBefore should return node on unknown type', async () => {
      const node = { type: 'unknown' };
      expect(await instance.transformBefore(node)).toBe(node);
    });
  }
}
