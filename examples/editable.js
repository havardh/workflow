/* eslint-disable no-unused-vars */
import React from '../helpers/jsx';

import { Workspace } from '../index';
import { SplitV, SplitH } from '../layout';
import { XTerm, Atom, Chrome } from '../apps';

import { projectRoot } from '../helpers/git';
import { getTestFile } from '../helpers/advisor';

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
          folder={() => root}
          file={() => `${root}/index.js`}
        />
      </SplitH>
      <XTerm
        cwd={() => root}
      />
    </SplitV>
  </Workspace>;

export default workspace;
