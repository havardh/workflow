const ipc = require('node-ipc');

ipc.config.id = 'workflow-server';
ipc.config.retry = 5000;
ipc.config.maxRetries = 10;

ipc.serveNet(() => {
  ipc.server.on('connect', socket => {
    ipc.log('server connected');
  });

  ipc.server.on('socket.disconnect', function() {
    ipc.log('server disconnected');
  });
});

ipc.server.start();

export function on(topic, cb) {
  console.log('on', topic);
  ipc.server.on(topic, (data, socket) => cb(data, socket, ipc.server));
}
