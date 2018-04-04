import React, { Component } from 'react';
import { pick, mapValues } from 'lodash';
import { Apps } from "workflow-core";

import { App } from '../';

export function generateAppComponent({ params, xClass, name, open }) {
  return class extends Component {
    static displayName = `app-${xClass || name}`;

    render() {
      const { props } = this;

      const appProps = pick(props, params);

      return (
        <App
          {...appProps}
          xClass={xClass}
          name={name}
          open={open}
          percent={props.percent}
        />
      );
    }
  };
}

export const defaults = mapValues(Apps.defaults, generateAppComponent);
export const linux = mapValues(Apps.linux, generateAppComponent);
export const osx = mapValues(Apps.osx, generateAppComponent);
export const windows = mapValues(Apps.windows, generateAppComponent);
