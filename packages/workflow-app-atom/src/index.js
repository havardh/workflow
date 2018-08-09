import { platform } from 'shared/apps';

import osx from './osx';

const atom = {
  type: 'app',
  name: 'Atom',
  xClass: 'Atom',
  params: ['file'],
  open: platform({
    'osx-default': osx,
    'linux-*': ({ file }) => `atom -n ${file}`,
  }),
};

export default atom;
