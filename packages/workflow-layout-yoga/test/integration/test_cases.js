/* eslint-env node, jest */
import React from 'react';
import render, { Workspace, requireComponent } from 'workflow-react';
const { Terminal } = requireComponent('workflow-apps-defaults');

import { Flex } from '../../src/components';

export default {
  'yoga with flex node': async applyAndCapture => {
    const flow = render(
      <Workspace name={'workflow-yoga-test'}>
        <Flex
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Terminal style={{ width: 300, height: 300 }} cwd={process.cwd()} />
          <Terminal style={{ width: 400, height: 500 }} cwd={process.cwd()} />
        </Flex>
      </Workspace>
    );

    expect(await applyAndCapture(flow)).toMatchImageSnapshot();
  },
};
