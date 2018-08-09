/* eslint-env node */
import { resolve } from "path";
import React from 'react';
import render, { Workspace, requireComponent, App } from 'workflow-react';

const Ssh = requireComponent("workflow-app-ssh");

export default render(
  <Workspace name={'workflow-app-ssh.example'}>
    <Ssh user="havard" host={"havardh.xyz"} />
  </Workspace>,
);
