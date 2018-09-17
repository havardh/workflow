import React from 'react';
import { render, Workspace, createComponent } from 'workflow-react';
import { defaults } from 'workflow-apps-html';
import * as Tiles from 'workflow-layout-tiled';

const Terminal = createComponent(defaults.Browser);
const TextEditor = createComponent(defaults.TextEditor);
const SplitV = createComponent(Tiles.SplitV);

export const flow = render(
  <Workspace name={'workflow-dev'}>
    <SplitV percent={1}>
      <TextEditor percent={0.66} file={'/home/user/dev/workflow/index.js'} />
      <Terminal percent={0.34} cwd={'/home/user/dev/workflow'} />
    </SplitV>
  </Workspace>
);
