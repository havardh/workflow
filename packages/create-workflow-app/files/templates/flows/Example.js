/* eslint-env node */
import { resolve } from 'path';
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Emacs = requireComponent('{{packageName}}');

export default render(
  <Workspace name={'workflow-app-example'}>
    <Emacs file={__filename} />
  </Workspace>
);
