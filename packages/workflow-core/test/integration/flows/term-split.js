/* eslint-env node */
/* eslint-disable no-unused-vars */
import React from '../../../src/helpers/jsx';

import { Workspace } from '../../../src/index';
import { SplitH } from '../../../src/layout';
import { Terminal } from '../../../src/apps/defaults';


const workspace =
  <Workspace name={'term:split'} >
    <SplitH>
      <Terminal cwd={process.cwd()} percent={0.8} />
      <Terminal cwd={process.cwd()} percent={0.2} />
    </SplitH>
  </Workspace>;

export default workspace;
