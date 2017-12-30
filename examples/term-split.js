/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitH } from '../layout';
import { XTerm } from '../apps';


const workspace =
  <Workspace name={'term:split'} >
    <SplitH>
      <XTerm percent={0.8} cwd={process.cwd()} />
      <XTerm percent={0.2} cwd={process.cwd()} />
    </SplitH>
  </Workspace>;

export default workspace;
