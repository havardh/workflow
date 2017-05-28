/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitV, SplitH } from '../layout';
import { Firefox, Gedit } from '../apps';

const workspace =
  <Workspace name={'firefox'} args={'url'} >
    <SplitH>
      <Gedit file={() => 'file.js'} />
      <Firefox url={({ url }) => url} />
    </SplitH>
  </Workspace>;

export default workspace;
