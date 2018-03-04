/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitV, SplitH } from '../layout';
import { XTerm, Atom } from '../apps';

import { projectRoot } from '../helpers/git';
import { getTestFile } from '../helpers/advisor';

/*
function onWorkspace() {
  startAdvisor();
  setCapConfig('cicero-bank.properties');
  startCap();
}
*/

const workspace =
  <Workspace
    name={'advisor:unit-test'}
    args={'file'}
  >
    <SplitV>
      <SplitH>
        <Atom
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => file}
        />
        <Atom
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => getTestFile(file)}
        />
      </SplitH>
      <XTerm
        cwd={({ file }) => projectRoot(file)}
        cmd={'npm run watch:test:base --'}
        args={[({ file }) => getTestFile(file)]}
      />
    </SplitV>
  </Workspace>;

export default workspace;
