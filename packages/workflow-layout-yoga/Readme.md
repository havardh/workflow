# Workflow Layout Yoga

This layout package lets you use the Yoga Flexbox implementation to define flows.

The package exposes a `Yoga` layout node which can be used as in place of any layout node.


# Usage

```
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Browser } = requireComponent("workflow-apps-defaults");
import { Flex } from "workflow-layout-yoga/components";

export const flow = render(
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
