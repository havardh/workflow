/* eslint-env node */
import React, { Component } from 'react';
import { mapValues } from 'lodash';

import { App } from '../components';

export function createComponent(app) {
  const {xClass, name} = app;
  return class extends Component {
    static displayName = `app-${xClass || name}`;

    render() {
      return (
        <App {...app} {...this.props} />
      );
    }
  };
}

export const defaults = mapValues(require("workflow-apps-defaults"), createComponent);

export let linux, osx, windows, html;
if (process.browser) {
  html = mapValues(require("workflow-apps-html"), createComponent);
} else {
  linux = mapValues(require("workflow-apps-linux"), createComponent);
  osx = mapValues(require("workflow-apps-osx"), createComponent);
  windows = mapValues(require("workflow-apps-windows"), createComponent);
}
