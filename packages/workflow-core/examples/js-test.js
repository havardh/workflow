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
  <Workspace args={'file'} name={'advisor:unit-test'} >
    <SplitV>
      <SplitH>
        <TextEditor
          file={({ file }) => file}
          folder={({ file }) => projectRoot(file)}
        />
        <TextEditor
          componentWillMount={(({ file }) => touch(file))}
          file={({ file }) => getTestFile(file)}
          folder={({ file }) => projectRoot(file)}
        />
      </SplitH>
      <Terminal
        args={[({ file }) => getTestFile(file)]}
        cmd={'npm run watch:test --'}
        cwd={({ file }) => projectRoot(file)}
      />
    </SplitV>
  </Workspace>;

export default workspace;
