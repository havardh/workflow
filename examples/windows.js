/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { SplitV } from '../layout';
import { Workspace } from '../index';
import { Notepad, IExplorer } from '../apps/windows';

import { urlForComponent } from '../helpers/advisor';

const workspace =
  <Workspace name={'windows'} args={'file'} >
    <SplitV>
      <Notepad file={({ file }) => file} />
      <IExplorer url={'rust-lang.org'} />
    </SplitV>
  </Workspace>;

export default workspace;
