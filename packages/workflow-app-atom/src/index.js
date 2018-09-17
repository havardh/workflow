import { platform } from 'shared/apps';

import { open as osx } from './osx';

export const Atom = {
  type: 'app',
  name: 'Atom',
  xClass: 'Atom',
  params: ['file'],
  open: platform({
    'osx-default': osx,
    'linux-*': ({ file }) => `atom -n ${file}`,
  }),
};
