/* eslint-disable no-unused-vars */
import React from '../src/helpers/jsx';

import { Workspace } from '../src/index';
import { SplitV, SplitH } from '../src/layout';
import { XTerm, Atom, Chrome } from '../src/apps';

import { projectRoot } from '../src/helpers/git';
import { getTestFile } from '../src/helpers/advisor';

const root = '~/dev/editable';
const url = 'http://www.codecommit.com/blog/java/understanding-and-applying-operational-transformation?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+codecommit+%28Code+Commit%29';

const workspace =
  <Workspace
    name={'editable'}
  >
    <SplitV>
      <SplitH>
        <Chrome url={() => url} />
        <Atom
          file={() => `${root}/index.js`}
          folder={() => root}
        />
      </SplitH>
      <XTerm
        cwd={() => root}
      />
    </SplitV>
  </Workspace>;

export default workspace;
