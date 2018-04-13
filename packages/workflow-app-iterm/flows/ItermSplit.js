/* eslint-env node */

import React from 'react';
import render, { Workspace } from 'workflow-react';

import ITerm, {Layouts, Apps} from "../index"; // "workflow-app-iterm"

const {Horizontal, Vertical} = Layouts;
const {Vim, Cmd, Emacs} = Apps;

export default render(
  <Workspace name={'workflow-iterm-split'}>
    <ITerm>
      <Horizontal>
        <Vertical>
          <Vim file={__filename} />
          <Cmd cwd={"~"} cmd={"ls"} />
        </Vertical>
        <Vertical>
          <Emacs file={"~/dev/workflow/Readme.md"} />
          <Cmd cwd={"~"} cmd={"ls"} />
        </Vertical>
      </Horizontal>
    </ITerm>
  </Workspace>,
);
