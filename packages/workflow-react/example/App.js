import React from 'react';
import render, { Workspace, SplitH, Apps } from 'workflow-react'; // eslint-disable-line

const { Code, Chrome } = Apps;

export default render(
  <Workspace name={'split-view-test'}>
    <SplitH percent={1}>
      <Code file={'test.js'} percent={0.2} />
      <Chrome percent={0.8} url={'https://google.com'}/>
    </SplitH>
  </Workspace>,
);
