/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Code } = requireComponent('workflow-app-code');

export const flow = render(
  <Workspace name={'workflow-app-code'}>
    <Code file={__filename} />
  </Workspace>
);
