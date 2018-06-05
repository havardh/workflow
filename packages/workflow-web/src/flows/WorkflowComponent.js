import React from "react";
import render, { Workspace, Layouts, Apps } from 'workflow-react';

const {Browser, TextEditor} = Apps.defaults;

const { SplitH } = Layouts;

export default render(
  <Workspace name={'workflow-component'}>
    <SplitH percent={1}>
      <TextEditor percent={0.5} file={"/home/user/dev/app/index.html"} />
      <Browser percent={0.5} url={"file:///home/user/dev/app/index.html"} />
    </SplitH>
  </Workspace>
);
