/* eslint-env node */

import React from 'react';
import render, { Workspace, Layouts, Apps } from 'workflow-react';

const {SplitV} = Layouts;
const {Terminal, ITerm2, Safari, Atom} = Apps.osx;

export default render(
  <Workspace name={'workflow-apps-osx'}>
    <SplitV percent={1}>
      <Terminal percent={0.25} cwd={"~"} cmd={"ls"} />
      <ITerm2 percent={0.25} cwd={"~"} cmd={"ls"} />
      <Safari percent={0.25} url={"https://github.com/havardh/workflow"} />
      <Atom percent={0.25} file={__filename} />
    </SplitV>
  </Workspace>,
);
