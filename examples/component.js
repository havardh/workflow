// @flow
import type { WorkspaceConfig } from '../index';

import { SplitH } from '../layout';
import { Chrome, Atom } from '../apps';

import { projectRoot } from '../helpers/git';
import { urlForComponent } from '../helpers/advisor';

const workspace : WorkspaceConfig = {
  name: 'advisor:component',
  args: 'file',
  root: SplitH({
    percent: 0.8,
    children: [
      Atom({
        percent: 0.5,
        folder: ({ file }) => projectRoot(file),
        file: ({ file }) => file,
        open: ({ file }) => `atom -n ${file}`,
      }),
      Chrome({
        percent: 0.5,
        url: ({ file }) => urlForComponent(file),
        open: ({ url }) => `google-chrome-stable --new-window ${url}`,
      }),
    ],
  }),
};

export default workspace;
