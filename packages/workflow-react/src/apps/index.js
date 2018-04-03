import React, { Component } from 'react';
import { pick, mapValues } from 'lodash';

import { App } from '../';

import * as defaultApps from "workflow-core/src/apps/defaults";

export function generateAppComponent({ params, xClass, open }) {
  return class extends Component {
    static displayName = `app-${xClass}`;

    render() {
      const { props } = this;

      const appProps = pick(props, params);

      return (
        <App
          {...appProps}
          xClass={xClass}
          open={open}
          percent={props.percent}
        />
      );
    }
  };
}

export const defaults = mapValues(defaultApps, generateAppComponent);
