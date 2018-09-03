/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Emacs = requireComponent('workflow-app-spotify');

export default render(
  <Workspace name={'workflow-app-example'}>
    <Emacs file={__filename} />
  </Workspace>
);
