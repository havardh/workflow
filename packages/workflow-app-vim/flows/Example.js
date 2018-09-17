/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Vim } = requireComponent('workflow-app-vim');

export const flow = render(
  <Workspace name={'workflow-app-vim'}>
    <Vim file={__filename} />
  </Workspace>
);
