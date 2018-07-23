/* eslint-env node */

import React from 'react';
import render, { Workspace, Layouts, Apps } from 'workflow-react';

const { SplitH } = Layouts;
const { TextEditor, Browser } = Apps.defaults;

/*
  NB this workflow requires the library workflow-react
  Run npm i workflow-react from your workflow homefolder
*/

// Docs: https://github.com/havardh/workflow/blob/master/packages/workflow-react/Readme.md

export default render(
  <Workspace name={'workflow-server-atom'}>
    <SplitH percent={1}>
      <Browser
        percent={0.5}
        url={'https://github.com/havardh/workflow/tree/master/packages/workflow-cmd'}
      />
      <TextEditor percent={0.5} file={__filename}>
        <VSplit>
          <File>/home/havard/dev/workflow/packages/workflow-app-atom/src/index.js</File>
          <File>/home/havard/dev/workflow/packages/workflow-server/src/index.js</File>
        </VSplit>
      </TextEditor>
    </SplitH>
  </Workspace>
);
