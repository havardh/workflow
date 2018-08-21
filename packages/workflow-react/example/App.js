import React from "react";
import render, { Workspace, Layouts, requireComponent } from "workflow-react";

const { SplitH } = Layouts;
const { TextEditor, Browser } = requireComponent("workflow-apps-defaults");

export default render(
  <Workspace name={"split-view-test"}>
    <SplitH percent={1}>
      <TextEditor file={"test.js"} percent={0.2} />
      <Browser percent={0.8} url={"https://google.com"} />
    </SplitH>
  </Workspace>
);
