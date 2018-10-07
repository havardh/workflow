/* eslint-env node */

import React from 'react';
import { join } from 'path';

import { render, Workspace, requireComponent } from 'workflow-react';
const { SplitH, SplitV } = requireComponent('workflow-layout-tiled');
const { Atom } = requireComponent('workflow-app-atom');
const { Chrome } = requireComponent('workflow-app-chrome');
const { ITerm } = requireComponent('workflow-app-iterm');
const { Terminal } = requireComponent('workflow-app-terminal');

export const flow = render(
  <Workspace name={'workflow-atom-chrome'}>
    <SplitV percent={1.0}>
      <SplitH percent={0.5}>
        <Atom percent={0.5} file={join(__dirname, '..', 'Readme.md')} />
        <Chrome
          percent={0.5}
          url={'https://www.github.com/havardh/workflow/packages/workflow-react'}
        />
      </SplitH>

      <ITerm percent={0.5}>
        <SplitH percent={1.0}>
          <Terminal percent={0.5} cwd={'~'} cmd={'ls -la'} />
          <Terminal percent={0.5} cwd={'~'} cmd={'pwd'} />
        </SplitH>
      </ITerm>
    </SplitV>
  </Workspace>
);
