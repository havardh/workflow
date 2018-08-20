/* eslint-env node */
import { mapValues } from "lodash";

import { createAppComponent } from "../createComponent";

export const defaults = mapValues(
  require("workflow-apps-defaults"),
  createAppComponent
);

export let html;
if (process.browser) {
  html = mapValues(require("workflow-apps-html").default, createAppComponent);
}
