/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const ITerm = requireComponent('workflow-app-iterm');
const Terminal = requireComponent('workflow-app-terminal');
const Emacs = requireComponent('workflow-app-emacs');
const Vim = requireComponent('workflow-app-vim');

const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');

export default render(
  <Workspace name={'workflow-iterm-split'}>
    <ITerm>
      <SplitH>
        <SplitV>
          <Vim file={__filename} />
          <Terminal cwd={'~'} cmd={'ls'} />
        </SplitV>
        <SplitV>
          <Emacs file={'~/dev/workflow/Readme.md'} />
          <Terminal cwd={'~'} cmd={'ls'} />
        </SplitV>
      </SplitH>
    </ITerm>
  </Workspace>
);
