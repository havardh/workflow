/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitV, SplitH } from '../src/layout';
import { XTerm, Atom } from '../src/apps';

import { projectRoot } from '../src/helpers/git';
import { getTestFile } from '../src/helpers/advisor';

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
