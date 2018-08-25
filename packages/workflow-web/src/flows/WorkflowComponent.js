import React from 'react';
import render, { Workspace, createComponent } from 'workflow-react';
import { defaults } from 'workflow-apps-html';
import * as Tiles from 'workflow-layout-tiled';

const Browser = createComponent(defaults.Browser);
const TextEditor = createComponent(defaults.TextEditor);
const SplitH = createComponent(Tiles.SplitH);

export default render(
  <Workspace name={'workflow-component'}>
    <SplitH percent={1}>
      <TextEditor percent={0.5} file={'/home/user/dev/app/index.html'} />
      <Browser percent={0.5} url={'file:///home/user/dev/app/index.html'} />
    </SplitH>
  </Workspace>
);
