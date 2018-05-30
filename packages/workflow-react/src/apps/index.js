/* eslint-env node */
import { mapValues } from 'lodash';

import {createAppComponent} from "../createComponent";

export const defaults = mapValues(require("workflow-apps-defaults"), createAppComponent);

export let linux, osx, windows, html;
if (process.browser) {
  html = mapValues(require("workflow-apps-html"), createAppComponent);
} else {
  linux = mapValues(require("workflow-apps-linux"), createAppComponent);
  osx = mapValues(require("workflow-apps-osx"), createAppComponent);
  windows = mapValues(require("workflow-apps-windows"), createAppComponent);
}
