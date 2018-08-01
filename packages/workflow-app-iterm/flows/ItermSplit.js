/* eslint-env node */

import React from 'react';
import render, { Workspace, Layouts, Apps } from 'workflow-react';

import ITerm from "../index"; // "workflow-app-iterm"

const {SplitH, SplitV} = Layouts;
const {Vim, Terminal, Emacs} = Apps.terminal;

export default render(
  <Workspace name={'workflow-iterm-split'}>
    <ITerm>
      <SplitH>
        <SplitV>
          <Vim file={__filename} />
          <Terminal cwd={"~"} cmd={"ls"} />
        </SplitV>
        <SplitV>
          <Emacs file={"~/dev/workflow/Readme.md"} />
          <Terminal cwd={"~"} cmd={"ls"} />
        </SplitV>
      </SplitH>
    </ITerm>
  </Workspace>,
);
