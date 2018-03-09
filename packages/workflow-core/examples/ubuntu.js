/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitV, SplitH } from '../src/layout';
import { Firefox, Gedit } from '../src/apps/linux';

const workspace =
  <Workspace args={'url'} name={'firefox'} >
    <SplitH>
      <Gedit file={() => 'file.js'} />
      <Firefox url={({ url }) => url} />
    </SplitH>
  </Workspace>;

export default workspace;
