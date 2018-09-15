import { platform } from 'shared/apps';

import { open as osx } from './osx';

export const Atom = {
  type: 'app',
  name: 'Atom',
  xClass: 'Atom',
  params: ['file', 'appId'],
  open: platform({
    'osx-default': osx,
    'linux-*': ({ file, appId }) => `WORKFLOW_APP_INSTANCE_ID=${appId} atom -dn ${file}`,
  }),
};

export { File };
