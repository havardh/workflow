import React from 'react';
import render, { Workspace, SplitH, Apps } from 'react-workflow'; // eslint-disable-line

const { Code, Chrome } = Apps;

export default render(
  <Workspace name={'split-view-test'}>
    <SplitH percent={1}>
      <Code percent={0.2} file={'test.js'} />
      <Chrome percent={0.8} url={'https://google.com'}/>
    </SplitH>
  </Workspace>,
);
