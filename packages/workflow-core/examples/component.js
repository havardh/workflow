/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitH } from '../src/layout';
import { Chrome, Atom } from '../src/apps/linux';

import { urlForComponent } from '../src/helpers/advisor';

const workspace =
  <Workspace args={'file'} name={'advisor:component'} >
    <SplitH>
      <Atom file={({ file }) => file} />
      <Chrome url={({ file }) => urlForComponent(file)} />
    </SplitH>
  </Workspace>;

export default workspace;
