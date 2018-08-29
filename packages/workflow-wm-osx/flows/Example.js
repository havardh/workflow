/* eslint-env node */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const { Browser } = requireComponent('workflow-apps-defaults');
const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');

export default render(
  <Workspace name={'workflow-app-xterm'}>
    <SplitV percent={1.0}>
    <SplitH percent={0.5}>
      <Browser percent={0.5} url="data:text/html,%3Ch1 style%3Dtext-align%3Acenter%3E1%3C%2Fh1%3E" />
      <Browser percent={0.5} url="data:text/html,%3Ch1 style%3Dtext-align%3Acenter%3E2%3C%2Fh1%3E" />
    </SplitH>
    <SplitH percent={0.5}>
      <Browser percent={0.5} url="data:text/html,%3Ch1 style%3Dtext-align%3Acenter%3E3%3C%2Fh1%3E" />
      <Browser percent={0.5} url="data:text/html,%3Ch1 style%3Dtext-align%3Acenter%3E4%3C%2Fh1%3E" />
    </SplitH>
  </SplitV>
  </Workspace>
);
