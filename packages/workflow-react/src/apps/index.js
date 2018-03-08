import React, { Component } from 'react';
import { pick, mapValues } from 'lodash';

import { App } from '../';

const apps = {
  Code: {
    params: ['file'],
    xClass: 'Code',
    open: ({ file }) => `code -n ${file}`,
  },
  Chrome: {
    params: ['url'],
    xClass: 'Google-chrome',
    open: ({ url }) => `google-chrome-stable --new-window ${url}`,
  },
};

export function generateAppComponent({ params, xClass, open }) {
  return class extends Component {
    static displayName = `app-${xClass}`;

    render() {
      const { props } = this;

      const appProps = pick(props, params);

      return (
        <App
          {...appProps}
          percent={props.percent}
          class={xClass}
          open={open}
        />
      );
    }
  };
}

const components = mapValues(apps, generateAppComponent);

export default components;
