import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { SplitH } = requireComponent('workflow-layout-tiled');
const { TextEditor, Browser } = requireComponent('workflow-apps-defaults');

export const flow = render(
  <Workspace name={'split-view-test'}>
    <SplitH percent={1}>
      <TextEditor file={'test.js'} percent={0.2} />
      <Browser percent={0.8} url={'https://google.com'} />
    </SplitH>
  </Workspace>
);
