/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { GnomeTerminal } = requireComponent('workflow-app-gnometerminal');

export const flow = render(
  <Workspace name={'workflow-app-gnometerminal'}>
    <GnomeTerminal cwd={__dirname} cmd={'ls'} />
  </Workspace>
);
