/* eslint-env node */
import React from 'react';
import render, { Workspace } from 'workflow-react';

import Tmux, {Layouts, Apps} from "../index";

const {SplitH, SplitV} = Layouts;
const {Vim, Emacs, Terminal} = Apps;

export default render(
  <Workspace>
    <Tmux sessionName={"tmux-example"}>
      <SplitV>
        <SplitH>
          <Vim file={__filename} />
          <Emacs file={__filename} />
        </SplitH>
        <Terminal cwd={__dirname} cmd={"ls"} />
      </SplitV>
    </Tmux>
  </Workspace>
);

