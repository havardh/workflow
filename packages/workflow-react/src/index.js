import render from './render/index';

import { App, Layout, Workspace, Async } from './components';
import { createComponent, createComponentRecursive } from './createComponent';
import requireComponent from './requireComponent';

export default render;

export {
  App,
  Layout,
  Workspace,
  Async,
  createComponent,
  createComponentRecursive,
  requireComponent,
};
