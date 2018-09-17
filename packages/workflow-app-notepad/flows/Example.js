/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Notepad } = requireComponent('workflow-app-notepad');

export const flow = render(
  <Workspace name={'workflow-app-example'}>
    <Notepad file={__filename} />
  </Workspace>
);
