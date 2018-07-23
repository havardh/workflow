import WebSocket from 'ws';

import { push } from './registry';

const wss = new WebSocket.Server({ port: 8080 });

export function apply(app, { url }) {
  app.ws.send(JSON.stringify({ url }));
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const { type, appId, processId } = JSON.parse(message);

    push({ connection: 'ws', appId, processId, ws });
  });
});

console.log('ws://localhost:8080');
