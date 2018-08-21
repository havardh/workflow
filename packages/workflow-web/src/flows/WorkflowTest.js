import React from "react";
import render, { Workspace, Layouts, createComponent } from "workflow-react";

import {defaults} from "workflow-apps-html";
const Terminal = createComponent(defaults.Terminal);
const TextEditor = createComponent(defaults.TextEditor);
const { SplitH, SplitV } = Layouts;

export default render(
  <Workspace name={"workflow-test"}>
    <SplitV>
      <SplitH percent={0.8}>
        <TextEditor
          percent={0.5}
          file={"/home/user/dev/workflow/src/index.js"}
        />
        <TextEditor
          percent={0.5}
          file={"/home/user/dev/workflow/test/index_tests.js"}
        />
      </SplitH>
      <Terminal percent={0.2} cwd={"/home/user/dev/workflow/"} />
    </SplitV>
  </Workspace>
);
