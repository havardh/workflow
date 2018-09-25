/* eslint-env node */

import React from 'react';
import { join } from 'path';

import { render, Workspace, requireComponent } from 'workflow-react';
const { SplitH } = requireComponent('workflow-layout-tiled');
const { Atom } = requireComponent('workflow-app-atom');
const { Chrome } = requireComponent('workflow-app-chrome');

export const flow = render(
  <Workspace name={'workflow-atom-chrome'}>
    <SplitH>
      <Atom percent={0.5} file={join(__dirname, '..', 'package.json')} />
      <Chrome percent={0.5} url={'https://www.github.com/havardh/workflow'} />
    </SplitH>
  </Workspace>
);
