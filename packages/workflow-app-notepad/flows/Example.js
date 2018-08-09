/* eslint-env node */
import { resolve } from "path";
import React from "react";
import render, { Workspace, requireComponent } from "workflow-react";

const Notepad = requireComponent("workflow-app-notepad");

export default render(
  <Workspace name={"workflow-app-example"}>
    <Notepad file={__filename} />
  </Workspace>
);
