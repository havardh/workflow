/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Safari } = requireComponent('workflow-app-safari');

export const flow = render(
  <Workspace name={'workflow-app-safari'}>
    <Safari percent={1.0} url={'https://example.com'} />
  </Workspace>
);
