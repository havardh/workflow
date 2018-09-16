/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const XTerm = requireComponent('workflow-app-xterm');

export default render(
  <Workspace name={'workflow-app-xterm'}>
    <XTerm cmd={'pwd'} />
  </Workspace>
);
