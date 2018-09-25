/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { XTerm } = requireComponent('workflow-app-xterm');

export const flow = render(
  <Workspace name={'workflow-app-xterm'}>
    <XTerm cwd={'~'} cmd={'less ' + __filename} style={{ fontSize: 20, fontFamily: 'monaco' }} />
  </Workspace>
);
