import ipc from 'node-ipc';

ipc.config.retry = 5000;
ipc.config.maxRetries = 10;
ipc.config.sync = true;

const channelId = 'workflow-server/client';

export async function start() {
  console.log('starting...');
  await execa('../cli', ['--config', configFile], { detached: true });
}

export function stop() {}

export function apply(path, args) {
  ipc.connectToNet(channelId, () => {
    const server = ipc.of[channelId];

    server.emit('apply', JSON.stringify({ path, args }));
  });
}
