/* eslint-env node */
import { basename } from 'path';
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Terminal } = requireComponent('workflow-app-terminal');

export const flow = render(
  <Workspace name={'workflow-app-example'}>
    <Terminal cwd={__dirname} cmd={'cat ' + basename(__filename)} />
  </Workspace>
);
