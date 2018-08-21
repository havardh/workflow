/* eslint-env node */
import React from 'react';
import render, { Workspace, Layouts, Apps } from 'workflow-react';
const { SplitH, SplitV } = Layouts;

const Tmux = requireComponent('workflow-app-tmux');
const Vim = requireComponent('workflow-app-vim');
const Emacs = requireComponent('workflow-app-emacs');
const Terminal = requireComponent('workflow-app-terminal');

export default render(
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
