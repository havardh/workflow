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
    args={'file'}
    name={'advisor:unit-test'}
  >
    <SplitV>
      <SplitH>
        <Atom
          file={({ file }) => file}
          folder={({ file }) => projectRoot(file)}
        />
        <Atom
          file={({ file }) => getTestFile(file)}
          folder={({ file }) => projectRoot(file)}
        />
      </SplitH>
      <XTerm
        args={[({ file }) => getTestFile(file)]}
        cmd={'npm run watch:test:base --'}
        cwd={({ file }) => projectRoot(file)}
      />
    </SplitV>
  </Workspace>;

export default workspace;
