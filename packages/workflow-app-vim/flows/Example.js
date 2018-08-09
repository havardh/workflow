/* eslint-env node */
import { resolve } from "path";
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Vim = requireComponent("workflow-app-vim");

export default render(
  <Workspace name={'workflow-app-vim'}>
    <Vim file={__filename} />
  </Workspace>,
);
