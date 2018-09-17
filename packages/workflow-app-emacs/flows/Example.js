/* eslint-env node */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Emacs, File, Plugins } = requireComponent('workflow-app-emacs');
const { SplitV, SplitH } = requireComponent('workflow-layout-tiled');

const { Status } = Plugins.Magit;

export const flow = render(
  <Workspace name="workflow-app-emacs">
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
