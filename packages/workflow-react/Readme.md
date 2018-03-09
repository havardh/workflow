# React frontend for workflow

This module contains a [react](https://github.com/facebook/react) binding library for
writing workflow configuration files. The example below shows how to configure
a 50-50 split between a text editor and a browser.

```
import React from 'react';
import render, { Workspace, SplitH, Apps } from 'workflow-react'; // eslint-disable-line

const { Code, Chrome } = Apps;

export default render(
  <Workspace name={'split-view-test'}>
    <SplitH percent={1}>
      <Code percent={0.5} file={'test.js'} />
      <Chrome percent={0.5} url={'https://google.com'}/>
    </SplitH>
  </Workspace>,
);
```
