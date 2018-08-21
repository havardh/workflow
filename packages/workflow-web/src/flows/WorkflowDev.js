import React from 'react';
import render, { Workspace, Layouts, createComponent } from 'workflow-react';

import { defaults } from 'workflow-apps-html';
const Terminal = createComponent(defaults.Browser);
const TextEditor = createComponent(defaults.TextEditor);

const { SplitV } = Layouts;

export default render(
  <Workspace name={'workflow-dev'}>
    <SplitV percent={1}>
      <TextEditor percent={0.66} file={'/home/user/dev/workflow/index.js'} />
      <Terminal percent={0.34} cwd={'/home/user/dev/workflow'} />
    </SplitV>
  </Workspace>
);
