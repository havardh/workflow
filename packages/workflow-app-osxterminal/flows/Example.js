/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Terminal = requireComponent("workflow-app-osxterminal");

export default render(
  <Workspace name={'workflow-app-osxterminal'}>
    <Terminal cwd={__dirname} cmd={"pwd"} />
  </Workspace>,
);
