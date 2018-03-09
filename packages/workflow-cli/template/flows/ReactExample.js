/* eslint-env node */
import React from 'react';
import render, { Workspace, Layouts, Apps } from 'workflow-react';

const { SplitH } = Layouts;
const { Code, Chrome } = Apps;

/*
  NB this workflow requires the library workflow-react
  Run npm i workflow-react from your workflow homefolder
*/

export default render(
  <Workspace name={'workflow-react-example'}>
    <SplitH percent={1}>
      <Code file={__filename} percent={0.2} />
      <Chrome
        percent={0.8}
        url={'https://github.com/havardh/workflow/tree/master/packages/workflow-cli'}
      />
    </SplitH>
  </Workspace>,
);
