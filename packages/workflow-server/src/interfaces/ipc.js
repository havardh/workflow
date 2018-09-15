const ipc = require('node-ipc');

import { push } from './registry';

ipc.config.id = 'workflow-server';
ipc.config.retry = 5000;
ipc.config.maxRetries = 10;
ipc.config.sync = true;

export function start() {
  ipc.server.start();
}

export function stop() {
  ipc.server.stop();
}

ipc.serveNet(() => {
  ipc.server.on('connect', socket => {
    ipc.log('server connected');
  });

  ipc.server.on('workflow.start', (data, socket) => {
    const { appId, processId } = JSON.parse(data);

    push({ connection: 'ipc', appId, processId, socket });
  });

  ipc.server.on('socket.disconnect', function() {
    ipc.log('server disconnected');
  });
});
