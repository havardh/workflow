/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');
const Tmux = requireComponent('workflow-app-tmux');
const Vim = requireComponent('workflow-app-vim');
const Less = requireComponent('workflow-app-less');

export default render(
  <Workspace>
    <Tmux sessionName={'tmux-test'}>
      <SplitV>
        <SplitH>
          <Vim file={__filename} />
          <SplitV>
            <Less file={__filename} />
            <Vim file={__dirname + '/../index.js'} />
          </SplitV>
          <Less file={__filename} />
        </SplitH>
        <Less follow file={__filename} />
      </SplitV>
    </Tmux>
  </Workspace>
);
