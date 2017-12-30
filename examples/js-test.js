/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitV, SplitH } from '../layout';
import { XTerm, Code } from '../apps';

import { projectRoot } from '../helpers/git';
import { getTestFile } from '../helpers/advisor';

import { exec } from '../util/shell';

function touch(file) {
  exec(`touch ${file}`);
}

const workspace =
  <Workspace name={'advisor:unit-test'} args={'file'} >
    <SplitV>
      <SplitH>
        <Code
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => file}
        />
        <Code
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => getTestFile(file)}
          componentWillMount={(({ file }) => touch(file))}
        />
      </SplitH>
      <XTerm
        cwd={({ file }) => projectRoot(file)}
        cmd={'npm run watch:test --'}
        args={[({ file }) => getTestFile(file)]}
      />
    </SplitV>
  </Workspace>;

export default workspace;
