import React from 'react';
import { render, Workspace, createComponent } from 'workflow-react';

import { defaults } from 'workflow-apps-html';
const TextEditor = createComponent(defaults.TextEditor);

export const flow = render(
  <Workspace name={'workflow-file-argument'} args={['file']}>
    <TextEditor file={({ file }) => file} />
  </Workspace>
);
