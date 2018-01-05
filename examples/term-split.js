/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitH } from '../layout';
import { Terminal } from '../apps/defaults';


const workspace =
  <Workspace name={'term:split'} >
    <SplitH>
      <Terminal percent={0.8} />
      <Terminal percent={0.2} />
    </SplitH>
  </Workspace>;

export default workspace;
