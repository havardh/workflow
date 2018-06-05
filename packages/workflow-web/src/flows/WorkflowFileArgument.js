import React from "react";
import render, { Workspace, Apps } from 'workflow-react';

const {TextEditor} = Apps.defaults;

export default render(
  <Workspace name={'workflow-file-argument'} args={["file"]}>
    <TextEditor file={({file}) => file} />
  </Workspace>
);
