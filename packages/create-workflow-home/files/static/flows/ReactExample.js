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
    <Workspace name={'workflow-react-example'}>
    <SplitH percent={1}>
    <TextEditor percent={0.2} file={__filename} />
    <Browser
  percent={0.8}
  url={'https://github.com/havardh/workflow/tree/master/packages/workflow-cmd'}
    />
    </SplitH>
    </Workspace>,
);
