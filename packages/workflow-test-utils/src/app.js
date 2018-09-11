/* eslint-env jest */
export function testApp(node) {
  const { name } = node;
  test('app should have name of type string', () => {
    expect(name).toBeTruthy();
    expect(typeof name).toEqual('string');
  });

  test(`${name} should have open function`, () => {
    expect(typeof node.open).toEqual('function');
  });

  test(`${name} should have params array`, () => {
    expect(Array.isArray(node.params)).toBeTruthy();
  });

  if (node.xClass) {
    test(`${name}.xClass should be string`, () => {
      expect(typeof node.xClass).toEqual('string');
    });
  }
}
