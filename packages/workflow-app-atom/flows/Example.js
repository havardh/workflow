/* eslint-env node */
import { resolve } from "path";
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const Atom = requireComponent("workflow-app-atom");

export default render(
  <Workspace name={'workflow-app-atom'}>
    <Atom file={"~/dev/circle-game/src/gamepad.rs"} />
  </Workspace>,
);
