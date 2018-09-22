/* eslint-env node */

import React from 'react';
import { join } from 'path';

import { render, Workspace, requireComponent } from 'workflow-react';
const { SplitH } = requireComponent('workflow-layout-tiled');
const { Atom } = requireComponent('workflow-app-atom');

export const flow = render(
  <Workspace name={'workflow-server-atom'}>
    <SplitH>
      <Atom percent={0.5} file={__filename} />
      <Atom percent={0.5} file={join(__dirname, '../package.json')} />
    </SplitH>
  </Workspace>
);
