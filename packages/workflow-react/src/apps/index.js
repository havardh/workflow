import React, { Component } from 'react';
import { pick, mapValues } from 'lodash';
import { Apps } from "workflow-core";

import { App } from '../';

export function createComponent({ params, xClass, name, open }) {
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

export const defaults = mapValues(Apps.defaults, createComponent);
export const linux = mapValues(Apps.linux, createComponent);
export const osx = mapValues(Apps.osx, createComponent);
export const windows = mapValues(Apps.windows, createComponent);
