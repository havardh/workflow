/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitH } from '../layout';
import { Chrome, Atom } from '../apps/linux';

import { urlForComponent } from '../helpers/advisor';

const workspace =
  <Workspace name={'advisor:component'} args={'file'} >
    <SplitH>
      <Atom file={({ file }) => file} />
      <Chrome url={({ file }) => urlForComponent(file)} />
    </SplitH>
  </Workspace>;

export default workspace;
