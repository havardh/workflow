/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Firefox } = requireComponent('workflow-app-firefox');

export const flow = render(
  <Workspace name={'workflow-app-filefox'}>
    <Firefox url={'https://www.example.com'} />
  </Workspace>
);
