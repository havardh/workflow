/* eslint-env node */
import { resolve } from "path";
import React from 'react';
import render, { Workspace, Layouts, requireComponent } from 'workflow-react';

const {Terminal, Browser, TextEditor} = requireComponent("workflow-apps-defaults");
const { SplitV } = Layouts;

export default render(
  <Workspace name={'workflow-apps-defaults'}>
    <SplitV percent={1.0}>
      <Terminal percent={0.33} cwd={__dirname} cmd={"pwd"} />
      <Browser percent={0.33} url={"https://github.com/havardh/workflow"} />
      <TextEditor percent={0.34} file={__filename} />
    </SplitV>
  </Workspace>,
);
