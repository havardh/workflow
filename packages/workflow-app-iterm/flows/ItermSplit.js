/* eslint-env node */

import React from 'react';
import render, { Workspace, Layouts } from 'workflow-react';

import ITerm, {Apps} from "../index"; // "workflow-app-iterm"

const {SplitH, SplitV} = Layouts;
const {Vim, Cmd, Emacs} = Apps;

export default render(
  <Workspace name={'workflow-iterm-split'}>
    <ITerm>
      <SplitH>
        <SplitV>
          <Vim file={__filename} />
          <Cmd cwd={"~"} cmd={"ls"} />
        </SplitV>
        <SplitV>
          <Emacs file={"~/dev/workflow/Readme.md"} />
          <Cmd cwd={"~"} cmd={"ls"} />
        </SplitV>
      </SplitH>
    </ITerm>
  </Workspace>,
);
