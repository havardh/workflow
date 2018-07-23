/* @flow */
import React from 'react';

import { App } from 'workflow-react';

const Vim = ({ file }: { file: string }) => <App open={`vim ${file}`} />;

const Less = ({ file, follow }: { file: string, follow: boolean }) => (
  <App open={`less ${follow ? '-f' : ''} ${file}`} />
);

const Emacs = ({ file }: { file: string }) => <App open={`emacs -nw ${file}`} />;

const Terminal = ({ cwd, cmd }: { cwd: string, cmd: string }) => (
  <App open={`cd ${cwd}; clear; ${cmd}`} />
);

export { Vim, Less, Emacs, Terminal };
