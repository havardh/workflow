/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitV, SplitH } from '../src/layout';
import { Firefox, Gedit } from '../src/apps/linux';

const workspace =
  <Workspace name={'firefox'} args={'url'} >
    <SplitH>
      <Gedit file={() => 'file.js'} />
      <Firefox url={({ url }) => url} />
    </SplitH>
  </Workspace>;

export default workspace;
