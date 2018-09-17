/* eslint-env node */
import { homedir } from 'os';
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { PowerShell } = requireComponent('workflow-app-powershell');

export const flow = render(
  <Workspace name={'workflow-app-powershell'}>
    <PowerShell cwd={homedir()} cmd={'ls'} />
  </Workspace>
);
