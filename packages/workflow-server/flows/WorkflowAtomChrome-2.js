/* eslint-env node */

import React from 'react';
import { join } from 'path';

import { render, Workspace, requireComponent } from 'workflow-react';
const { SplitV } = requireComponent('workflow-layout-tiled');
const { Atom } = requireComponent('workflow-app-atom');
const { Chrome } = requireComponent('workflow-app-chrome');

export const flow = render(
  <Workspace name={'workflow-atom-chrome'}>
    <SplitV>
      <Atom percent={0.5} file={__filename} />
      <Chrome percent={0.5} url={'https://example.com'} />
    </SplitV>
  </Workspace>
);
