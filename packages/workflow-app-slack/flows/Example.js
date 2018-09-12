/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Slack = requireComponent('workflow-app-slack');

export default render(
  <Workspace name={'workflow-app-slack'}>
    <Slack teamId={'T3TTMDQCF'} />
  </Workspace>
);
