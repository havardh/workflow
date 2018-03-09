/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { SplitV } from '../src/layout';
import { Workspace } from '../src/index';
import { Notepad, IExplorer } from '../src/apps/windows';

import { urlForComponent } from '../src/helpers/advisor';

const workspace =
  <Workspace args={'file'} name={'windows'} >
    <SplitV>
      <Notepad file={({ file }) => file} />
      <IExplorer url={'rust-lang.org'} />
    </SplitV>
  </Workspace>;

export default workspace;
