# Workflow Layout Yoga

This layout package lets you use the Yoga Flexbox implementation to define flows.

The package exposes a `Yoga` layout node which can be used as any layout nodes.
In addition the package exposes a `Yoga` and `Flex` component for easy
integration with the `workflow-react` package.

# Usage

```
import React from 'react';
import render, { Workspace, Apps } from 'workflow-react';

const { Browser } = Apps.defaults;
import { Flex } from "workflow-layout-yoga/components";

export default render(
  <Workspace name={'workflow-yoga-example'}>
    <Flex name="flex" style={{
      justifyContent: "center",
      alignItems: "center",
   }}>
      <Browser
        style={{width: "80%", height: "80%"}}
        url={'https://github.com/havardh/workflow/tree/master/packages/workflow-cmd'}
      />
    </Flex>
  </Workspace>,
);
```
