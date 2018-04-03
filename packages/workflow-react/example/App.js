import React from 'react';
import render, { Workspace, SplitH, Apps } from 'workflow-react'; // eslint-disable-line

const { TextEditor, Browser } = Apps.defaults;

export default render(
  <Workspace name={'split-view-test'}>
    <SplitH percent={1}>
      <TextEditor file={'test.js'} percent={0.2} />
      <Browser percent={0.8} url={'https://google.com'}/>
    </SplitH>
  </Workspace>,
);
