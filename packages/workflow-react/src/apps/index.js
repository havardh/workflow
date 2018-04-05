import React, { Component } from 'react';
import { mapValues } from 'lodash';
import { Apps } from "workflow-core";

import { App } from '../';

export function createComponent({ open, xClass, name }) {
  return class extends Component {
    static displayName = `app-${xClass || name}`;

    render() {
      const props = {open, xClass, name};

      return (
        <App {...props} {...this.props} />
      );
    }
  };
}

export const defaults = mapValues(Apps.defaults, createComponent);
export const linux = mapValues(Apps.linux, createComponent);
export const osx = mapValues(Apps.osx, createComponent);
export const windows = mapValues(Apps.windows, createComponent);
