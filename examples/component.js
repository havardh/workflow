/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitH } from '../layout';
import { Chrome, Atom } from '../apps';

import { urlForComponent } from '../helpers/advisor';

const workspace =
  <Workspace
    name={'advisor:component'}
    args={'file'}
  >
    <SplitH>
      <Atom
        file={({ file }) => file}
        open={({ file }) => `atom -n ${file}`}
      />
      <Chrome
        url={({ file }) => urlForComponent(file)}
        open={({ url }) => `google-chrome-stable --new-window ${url}`}
      />
    </SplitH>
  </Workspace>;

export default workspace;
