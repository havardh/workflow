/* eslint-env node */
import React from 'react';
import { render, Workspace, Async, requireComponent } from 'workflow-react';
import { Terminal } from 'workflow-apps-defaults';
const { SplitV } = requireComponent('workflow-layout-tiled');

export const flow = render(
  <Workspace name={'workflow-apps-defaults'}>
    <SplitV percent={1.0}>
      <Async
        percent={0.5}
        cwd={__dirname}
        cmd={'pwd'}
        loader={async props => ({ ...Terminal, ...props })}
      />
      <Async
        percent={0.5}
        cwd={__dirname}
        cmd={'pwd'}
        loader={async props => ({ ...Terminal, ...props })}
      />
    </SplitV>
  </Workspace>
);
