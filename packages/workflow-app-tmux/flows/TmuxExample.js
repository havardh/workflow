/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';
const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');

const { Tmux } = requireComponent('workflow-app-tmux');
const { Vim } = requireComponent('workflow-app-vim');
const { Emacs } = requireComponent('workflow-app-emacs');
const { Terminal } = requireComponent('workflow-app-terminal');

export const flow = render(
  <Workspace>
    <Tmux sessionName={'tmux-example'}>
      <SplitV>
        <SplitH>
          <Vim file={__filename} />
          <Emacs file={__filename} />
        </SplitH>
        <Terminal cwd={__dirname} cmd={'ls'} />
      </SplitV>
    </Tmux>
  </Workspace>
);
