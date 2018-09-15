/* eslint-env node */

import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';

const { SplitH } = requireComponent('workflow-layout-tiled');
const Atom = requireComponent('workflow-app-atom');
const { File } = Atom;

export default render(
  <Workspace name={'workflow-server-atom'} args={'file'}>
    <Atom file={({ file }) => file} />
  </Workspace>
);
