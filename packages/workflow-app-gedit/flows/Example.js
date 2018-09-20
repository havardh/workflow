/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Gedit } = requireComponent('workflow-app-gedit');

export const flow = render(
  <Workspace name={'workflow-app-gedit'}>
    <Gedit file={__filename} />
  </Workspace>
);
