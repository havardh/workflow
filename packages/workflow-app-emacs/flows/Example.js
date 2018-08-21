/* eslint-env node */
import { resolve } from 'path';
import React from 'react';
import render, { Workspace, Layouts, requireComponent } from 'workflow-react';

const Emacs = requireComponent('workflow-app-emacs');

const { SplitV, SplitH } = Layouts;
const { File } = Emacs;
const { Status } = Emacs.Plugins.Magit;

export default render(
  <Workspace>
    <Emacs>
      <SplitH>
        <SplitV>
          <File file={`${__dirname}/../package.json`} />
          <Status path={__dirname} />
        </SplitV>
        <File file={`${__dirname}/../flows/emacs.js`} />
      </SplitH>
    </Emacs>
  </Workspace>
);
