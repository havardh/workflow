/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitV, SplitH } from '../src/layout';
import { Terminal, TextEditor } from '../src/apps/defaults';

import { projectRoot } from '../src/helpers/git';
import { getTestFile } from '../src/helpers/advisor';

import { exec } from '../src/util/shell';

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
