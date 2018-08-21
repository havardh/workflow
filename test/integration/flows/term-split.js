/* eslint-env node */
/* eslint-disable no-unused-vars */
import React from "react";
import render, { Workspace, Layouts, requireComponent } from "workflow-react";

const { SplitH } = Layouts;
const { Terminal } = requireComponent("workflow-apps-defaults");

export default render(
  <Workspace name={"term:split"}>
    <SplitH>
      <Terminal cwd={process.cwd()} percent={0.8} />
      <Terminal cwd={process.cwd()} percent={0.2} />
    </SplitH>
  </Workspace>
);
