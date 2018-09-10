import { omit } from 'lodash';
import { Root, Workspace, App, Layout, Async } from '../components/index';

const parse = component => {
  const { children, props } = component;

  if (
    !(component instanceof Root) &&
    !(component instanceof Workspace) &&
    !(component instanceof App) &&
    !(component instanceof Async) &&
    !(component instanceof Layout)
  ) {
    throw new Error('Component unknown: ', JSON.stringify(component));
  }

  if (component instanceof Root) {
    return { ...parse(children[0]) };
  } else {
    return {
      ...omit(props, 'children'),
      children: children.map(parse),
    };
  }
};

export default parse;
