/* eslint-env node */
import { mapValues } from 'lodash';

import {createAppComponent} from "../createComponent";

export const defaults = mapValues(require("workflow-apps-defaults"), createAppComponent);

export let linux, osx, windows, html, terminal;
if (process.browser) {
  html = mapValues(require("workflow-apps-html").default, createAppComponent);
} else {
  terminal = mapValues(require("workflow-apps-terminal"), createAppComponent);
}
