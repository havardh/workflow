/* eslint-env node */
import { resolve } from 'path';
import { homedir } from 'os';
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const PowerShell = requireComponent('workflow-app-powershell');

export default render(
  <Workspace name={'workflow-app-powershell'}>
    <PowerShell cwd={homedir()} cmd={'ls'} />
  </Workspace>
);
