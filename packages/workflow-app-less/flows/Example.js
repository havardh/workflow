/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Terminal = requireComponent('workflow-app-terminal');
const Less = requireComponent('workflow-app-less');

export default render(
  <Workspace name={'workflow-app-less'}>
    <Terminal>
      <Less follow file={__filename} />
    </Terminal>
  </Workspace>
);
