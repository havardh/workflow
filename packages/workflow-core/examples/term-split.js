/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitH } from '../src/layout';
import { Terminal } from '../src/apps/defaults';


const workspace =
  <Workspace name={'term:split'} >
    <SplitH>
      <Terminal percent={0.8} cwd={process.cwd()} />
      <Terminal percent={0.2} cwd={process.cwd()} />
    </SplitH>
  </Workspace>;

export default workspace;
