/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent, createComponentRecursive } from 'workflow-react';
import { Terminal } from 'workflow-apps-defaults';

const TerminalAsync = createComponentRecursive({
  type: 'async',
  name: 'TerminalAsync',
  loader: async () => Terminal,
});
const { SplitV } = requireComponent('workflow-layout-tiled');

export default render(
  <Workspace name={'workflow-apps-defaults'}>
    <SplitV percent={1.0}>
      <TerminalAsync percent={0.5} cwd={__dirname} cmd={'pwd'} />
      <TerminalAsync percent={0.5} cwd={__dirname} cmd={'pwd'} />
    </SplitV>
  </Workspace>
);
