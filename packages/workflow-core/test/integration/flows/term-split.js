/* eslint-env node */
/* eslint-disable no-unused-vars */
import React from 'workflow-core/src/helpers/jsx';

import { Workspace } from 'workflow-core/src/index';
import { SplitH } from 'workflow-core/src/layout';
import { Terminal, TextEditor } from 'workflow-core/src/apps/defaults';


const workspace =
  <Workspace name={'term:split'} >
    <SplitH>
      <TextEditor file={__filename} percent={0.4} />
      <Terminal cwd={process.cwd()} percent={0.6} />
    </SplitH>
  </Workspace>;

export default workspace;
