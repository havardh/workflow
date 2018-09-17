import { Yoga } from './yoga';

export const Flex = {
  type: 'layout',
  layout: (node, { position }) => Yoga.layout({ ...node, flex: 1 }, { position }),
};
