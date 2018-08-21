/* eslint-env node */
import { resolve } from 'path';
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Code = requireComponent('workflow-app-code');

export default render(
  <Workspace name={'workflow-app-code'}>
    <Code file={__filename} />
  </Workspace>
);
