/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Atom = requireComponent('workflow-app-atom');

export default render(
  <Workspace name={'workflow-app-atom'}>
    <Atom file={__filename} />
  </Workspace>
);
