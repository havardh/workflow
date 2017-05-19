/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitV, SplitH } from '../layout';
import { XTerm, Atom } from '../apps';

import { projectRoot } from '../helpers/git';
import { getTestFile } from '../helpers/advisor';


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
          open={({ file }) => `atom -n ${file}`}
        />
        <Atom
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => getTestFile(file)}
          open={({ file }) => `atom -n ${file}`}
        />
      </SplitH>
      <XTerm
        cwd={({ file }) => projectRoot(file)}
        cmd={'npm run watch:test:base --'}
        args={[({ file }) => getTestFile(file)]}
        open={({ cwd, cmd, args }) => `cd ${cwd} && xterm -T '${cmd} ${args.join(' ')}' -e '${cmd} ${args.join(' ')}'`}
      />
    </SplitV>
  </Workspace>;

export default workspace;
