/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const TextEdit = requireComponent('workflow-app-textedit');
const { SplitH } = requireComponent('workflow-layout-tiled');

export default render(
  <Workspace name={'workflow-app-textedit-example'}>
    <SplitH percent={1.0}>
      <TextEdit file={__filename} percent={1.0} />
    </SplitH>
  </Workspace>
);
