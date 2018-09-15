const ipc = require('node-ipc');

ipc.config.id = 'workflow-server/client';
ipc.config.retry = 5000;
ipc.config.maxRetries = 10;
ipc.config.sync = true;

export function start({ apply }) {
  ipc.serveNet('localhost', 5000, () => {
    ipc.server.on('connect', socket => {
      ipc.log('server connected');
    });

    ipc.server.on('workflow.apply', (data, socket) => {
      const { path, args } = JSON.parse(data);
      apply(path, args);
    });

    ipc.server.on('socket.disconnect', function() {
      ipc.log('server disconnected');
    });
  });

  ipc.server.start();
}

export function stop() {
  ipc.server.stop();
}
