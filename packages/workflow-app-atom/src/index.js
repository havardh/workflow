const ipc = require('node-ipc');

ipc.config.id = 'workflow-app-atom';
ipc.config.retry = 1500;
ipc.config.sync = true;

const appId = process.env.WORKFLOW_APP_ID;
const processId = process.pid;

ipc.connectToNet('workflow-server', () => {
  const server = ipc.of['workflow-server'];

  server.on('connect', () => {
    console.log('client connected');

    server.emit(
      JSON.stringify({
        type: 'register',
        appId: appId,
        processId: processId,
      })
    );
  });

  server.on('disconnect', () => {
    console.log('client disconnected');
  });
});

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
