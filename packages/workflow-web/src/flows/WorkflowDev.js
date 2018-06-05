import React from "react";
import render, { Workspace, Layouts, Apps } from 'workflow-react';

const {TextEditor, Terminal} = Apps.defaults;

const { SplitV } = Layouts;

export default render(
  <Workspace name={'workflow-dev'}>
    <SplitV percent={1}>
      <TextEditor percent={0.66} file={"/home/user/dev/workflow/index.js"} />
      <Terminal percent={0.34} cwd={"/home/user/dev/workflow"} />
    </SplitV>
  </Workspace>
);
