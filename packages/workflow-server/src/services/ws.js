import WebSocket from 'ws';

import { push } from '../registry';

export function apply(app, { url }) {
  console.log('send', app, { url });
  app.ws.send(JSON.stringify({ url }));
}

let wss;
export function start() {
  wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      const { type, appId, processId } = JSON.parse(message);
      console.log('register', { type, appId, processId });

      push({ connection: 'ws', appId, processId, ws });
    });
  });
  console.log('ws://localhost:8080');
}

export function stop() {
  if (wss) {
    wss.close();
  }
}
