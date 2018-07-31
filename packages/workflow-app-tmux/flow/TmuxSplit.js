/* eslint-env node */
import React from 'react';
import render, { Workspace, Layouts } from 'workflow-react';

import Tmux, {Apps} from "../index";

const {SplitV, SplitH} = Layouts;
const {Vim, Less} = Apps;

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

