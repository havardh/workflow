// @flow
import type {WorkspaceConfig} from "../workflow";

import { SplitV, SplitH } from '../workflow/layout';
import { XTerm, Atom } from '../workflow/apps';

import { projectRoot } from '../workflow/helpers/git';
import { getTestFile } from '../workflow/helpers/advisor';

const workspace : WorkspaceConfig = {
  name: 'advisor:unit-test',
  args: 'file',
  root: SplitV({
    percent: 1.0,
    children: [
      SplitH({
        percent: 0.8,
        children: [
          Atom({
            percent: 0.5,
            folder: ({ file }) => projectRoot(file),
            file: ({ file }) => file,
            open: ({ file }) => `atom -n ${file}`,
          }),
          Atom({
            percent: 0.5,
            folder: ({ file }) => projectRoot(file),
            file: ({ file }) => getTestFile(file),
            open: ({ file }) => `atom -n ${file}`,
          }),
        ],
      }),
      XTerm({
        percent: 0.2,
        cwd: ({ file }) => projectRoot(file),
        cmd: 'npm run watch:test:base --',
        args: [
          ({ file }) => getTestFile(file),
        ],
        open: ({ cwd, cmd, args }) => `cd ${cwd} && xterm -T '${cmd} ${args.join(' ')}' -e '${cmd} ${args.join(' ')}'`
      }),
    ],
  }),
};

export default workspace;
