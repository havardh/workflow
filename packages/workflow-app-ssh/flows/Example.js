/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Ssh } = requireComponent('workflow-app-ssh');

export const flow = render(
  <Workspace name={'workflow-app-ssh.example'}>
    <Ssh user="havard" host={'havardh.xyz'} />
  </Workspace>
);
