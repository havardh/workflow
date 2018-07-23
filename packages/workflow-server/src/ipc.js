const ipc = require('node-ipc');

import { push } from './registry';

ipc.config.id = 'workflow-server';
ipc.config.retry = 1500;
ipc.config.sync = true;

export function apply(app, { file }) {
  ipc.server.emit(app.socket, 'workflow.apply', JSON.stringify({ file }));
}

ipc.serveNet(() => {
  ipc.server.on('connect', socket => {
    ipc.log('server connected');
  });

  ipc.server.on('workflow.register', (data, socket) => {
    const { appId, processId } = JSON.parse(data);

    push({ connection: 'ipc', appId, processId, socket });
  });

  ipc.server.on('socket.disconnect', function() {
    ipc.log('server disconnected');
  });
});

ipc.server.start();
