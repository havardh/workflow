/* eslint-env node */
import { resolve, basename } from "path";
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Terminal = requireComponent("workflow-app-terminal");

export default render(
  <Workspace name={'workflow-app-example'}>
    <Terminal cwd={__dirname} cmd={"cat " + basename(__filename) } />
  </Workspace>,
);
