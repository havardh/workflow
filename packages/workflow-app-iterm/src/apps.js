/* @flow */
import React from 'react';
import { App } from 'workflow-react';

export const Vim = ({ file }: { file: string }) => <App cmd={`vim ${file}`} />;

export const Cmd = ({ cwd, cmd }: { cwd: string, cmd: string }) => <App cwd={cwd} cmd={cmd} />;

export const Emacs = ({ file }: { file: string }) => <App cmd={`emacs -nw ${file}`} />;
