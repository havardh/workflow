import createComponent from './createComponent';

export const SplitV = createComponent({
  type: 'layout',
  name: 'SplitV',
  layout: 'splitv',
});
export const SplitH = createComponent({
  type: 'layout',
  name: 'SplitH',
  layout: 'splith',
});

export const Workspace = createComponent({
  type: 'workspace',
  name: 'Workspace',
});
