/* eslint-env node */

import React from "react";
import render, { Workspace, requireComponent } from "workflow-react";
import { Flex } from "../components";

const { TextEditor, Browser } = requireComponent("workflow-apps-defaults");

export default render(
  <Workspace name={"workflow-yoga-example"}>
    <Flex
      name="flex"
      style={{
        flexDirection: "row",
        alignContent: "stretch"
      }}
    >
      <Flex
        style={{
          flexGrow: 2,
          flexDirection: "column",
          alignContent: "stretch"
        }}
      >
        <TextEditor
          name={"text-editor"}
          style={{ flexGrow: 1, flexBasis: 100 }}
          file={__filename}
        />
        <TextEditor
          name={"text-editor"}
          style={{ flexGrow: 1, flexBasis: 100 }}
          file={__filename}
        />
      </Flex>
      <Browser
        name="browser"
        style={{ flexGrow: 1 }}
        url={
          "https://github.com/havardh/workflow/tree/master/packages/workflow-cmd"
        }
      />
    </Flex>
  </Workspace>
);
