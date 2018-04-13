# iTerm app for workflow

Workflow iTerm app for workflow with layout management within the iTerm2
instance.

The `Vertical` and `Horizontal` components from the layout module can be used
to create arbitrary tile layouts. They can contain a number of Apps or nested
layout components. The with of each split is not possible to specify, it will
be the size of the contained area divide by the number of children. 

## Example

```
import React from 'react';
import render, { Workspace } from 'workflow-react';

import ITerm, {Layouts, Apps} from "workflow-app-iterm"

const {Horizontal, Vertical} = Layouts;
const {Vim, Cmd, Emacs} = Apps;

export default render(
  <Workspace name={'workflow-iterm-split'}>
    <ITerm>
      <Horizontal>
        <Vertical>
          <Vim file={__filename} />
          <Cmd cwd={"~"} cmd={"ls"} />
        </Vertical>
        <Vertical>
          <Emacs file={"~/dev/workflow/Readme.md"} />
          <Cmd cwd={"~"} cmd={"ls"} />
        </Vertical>
      </Horizontal>
    </ITerm>
  </Workspace>,
);
```

## Demo

Try it with: `yarn ItermSplit`

![Demo](github/iterm.gif)
