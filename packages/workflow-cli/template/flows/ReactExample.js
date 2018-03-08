import React from 'react'; // eslint-disable-line
import render, { Workspace, Layouts, Apps } from 'workflow-react'; // eslint-disable-line

const { SplitH } = Layouts;
const { Code, Chrome } = Apps;

/*
  NB this workflow requires the library workflow-react
  Run npm i workflow-react from your workflow homefolder
*/

export default render(
  <Workspace name={'workflow-react-example'}>
    <SplitH percent={1}>
      <Code percent={0.2} file={__filename} />
      <Chrome
        percent={0.8}
        url={'https://github.com/havardh/workflow/tree/master/packages/workflow-cli'}
      />
    </SplitH>
  </Workspace>,
);
