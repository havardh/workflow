import render from './render/index';

import * as Layouts from './layouts/split';
import * as Apps from './apps/index';

import { App, Layout, Workspace } from './components';
import createComponent from './createComponent';
import requireComponent from './requireComponent';

export default render;

export { App, Layout, Workspace, Layouts, Apps, createComponent, requireComponent };
