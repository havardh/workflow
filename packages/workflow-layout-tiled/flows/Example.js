/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Terminal, Browser, TextEditor } = requireComponent('workflow-apps-defaults');
const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');

export const flow = render(
  <Workspace name={'workflow-apps-defaults'}>
    <SplitV percent={1.0}>
      <Terminal percent={0.5} />
      <SplitH percent={0.5}>
        <Browser percent={0.5} url={'https://github.com/havardh/workflow'} />
        <TextEditor percent={0.5} file={__filename} />
      </SplitH>
    </SplitV>
  </Workspace>
);
