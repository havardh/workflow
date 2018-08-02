/* eslint-env node */
import React from 'react';
import render, { Workspace, Layouts } from 'workflow-react';

import Emacs, {File, Plugins} from "../index";

const {SplitV, SplitH} = Layouts;
const {MagitStatus} = Plugins.Magit;

export default render(
  <Workspace>
    <Emacs>
      <SplitH>
        <SplitV>
          <File file={`${__dirname}/../package.json`}/>
          <MagitStatus path={__dirname} />
        </SplitV>
        <File file={`${__dirname}/../flows/emacs.js`} />
      </SplitH>
    </Emacs>
  </Workspace>
);

