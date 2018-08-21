/* eslint-env node */
import { resolve } from 'path';
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Safari = requireComponent('workflow-app-safari');

export default render(
  <Workspace name={'workflow-app-safari'}>
    <Safari percent={1.0} url={'https://example.com'} />
  </Workspace>
);
