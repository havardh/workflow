/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitV, SplitH } from '../layout';
import { Terminal, TextEditor } from '../apps/defaults';

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
        <TextEditor
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => file}
        />
        <TextEditor
          folder={({ file }) => projectRoot(file)}
          file={({ file }) => getTestFile(file)}
          componentWillMount={(({ file }) => touch(file))}
        />
      </SplitH>
      <Terminal
        cwd={({ file }) => projectRoot(file)}
        cmd={'npm run watch:test --'}
        args={[({ file }) => getTestFile(file)]}
      />
    </SplitV>
  </Workspace>;

export default workspace;
