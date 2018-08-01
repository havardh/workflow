/* eslint-env node */
import React from 'react';
import render, { App, Workspace, Layouts, Apps } from 'workflow-react';
const {SplitV, SplitH} = Layouts;
const {Vim, Less} = Apps.terminal;

import Tmux from "../index";

export default render(
  <Workspace>
    <Tmux sessionName={"tmux-test"}>
      <SplitV>
        <SplitH>
          <Vim file={__filename} />
          <SplitV>
            <Less file={__filename} />
            <Vim file={__dirname + "/../index.js"} />
          </SplitV>
          <Less file={__filename} />
        </SplitH>
        <Less follow file={__filename} />
      </SplitV>
    </Tmux>
  </Workspace>
);

