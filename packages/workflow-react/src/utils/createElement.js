import { Root, Workspace, Layout, App } from '../components/index';

import { ROOT_NODE } from '../render/index';

export function getHostContextNode() {
  return ROOT_NODE;
}

export function createElement(type, props) {
  const COMPONENTS = {
    ROOT: () => new Root(),
    WORKSPACE: () => new Workspace(props),
    LAYOUT: () => new Layout(props),
    APP: () => new App(props),
    default: undefined,
  };

  return COMPONENTS[type]();
}
