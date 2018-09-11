/* eslint-env node */

import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const { SplitH, SplitV } = requireComponent('workflow-layout-tiled');
const { TextEditor, Browser, Terminal } = requireComponent('workflow-apps-defaults');

export default render(
  <Workspace name={'workflow-react-example'}>
    <SplitV percent={1.0}>
      <SplitH percent={0.8}>
        <TextEditor percent={0.5} file={__filename} />
        <Browser percent={0.5} url={'https://github.com/havardh/workflow'} />
      </SplitH>
      <Terminal percent={0.2} cwd={__dirname} />
    </SplitV>
  </Workspace>
);
