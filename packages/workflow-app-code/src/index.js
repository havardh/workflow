/* eslint-env node */
/* global Application */
import execa from 'execa';

import { platform } from 'shared/apps';

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

const code = {
  type: 'app',
  name: 'Code',
  xClass: 'Code',
  params: ['file'],
  open: platform({
    'osx-default': osx,
    'win32-default': windows,
  }),
};

async function windows({ file, position }, { winApi }) {
  const { pid } = execa.shell('code', ['-n', file]);

  await timeout(2000);

  const { left, top, width, height } = position;
  winApi.setPosition(pid, left, top, width, height);
}

async function osx({ file, position }, { run }) {
  await execa('code', ['-n', file]);

  await timeout(2000);

  run(position => {
    const Code = Application('Code');
    Code.windows[0].bounds = position;
  }, position);
}

export default code;
