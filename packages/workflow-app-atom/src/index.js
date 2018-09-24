import { platform } from 'shared/apps';

import { open as osx } from './osx';

export const Atom = {
  type: 'app',
  name: 'Atom',
  xClass: 'Atom',

  async open({ file, appId }, { run }, children) {
    return `WORKFLOW_APP_INSTANCE_ID=${appId} atom -dn ${file}`;
  },

  async update({ file }, context) {
    if (context && context.send && typeof context.send === 'function') {
      context.send({ topic: 'workflow.apply', message: { file } });
    }
  },
};
