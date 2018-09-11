import WorkflowTransformerAsync from '../../src';

let transformer;
beforeAll(() => {
  transformer = new WorkflowTransformerAsync();
});

test('WorkflowTransformerAsync should transform to the value that loader resolves when type is "async"', async () => {
  const open = () => {};

  const transformed = await transformer.transformBefore({
    type: 'async',
    loader: async props => ({ ...props, type: 'app', name: 'Iterm', open }),
    percent: 0.5,
  });

  expect(transformed).toEqual({
    type: 'app',
    name: 'Iterm',
    open,
    percent: 0.5,
  });
});

test('WorkflowTransformerAsync should do nothing when type is not "async"', async () => {
  const app = { type: 'app', name: 'Iterm', open: () => {} };

  const transformed = await transformer.transformBefore(app);

  expect(transformed).toEqual(app);
});
