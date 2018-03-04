import React from 'react';
import render, { Workspace, Layout } from '../src';

import { SplitH } from '../src/layouts/split';
import Apps from '../src/apps';
const { Code, Chrome } = Apps;

export default render(
  <Workspace name={'split-view-test'}>
    <SplitH percent={1}>
      <Code percent={0.2} file={'test.js'} />
      <Chrome percent={0.8} url={'https://google.com'}/>
    </SplitH>
  </Workspace>,
);
