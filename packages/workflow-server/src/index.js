import uuid from 'uuid';
//import * as ipc from './ipc';
import WebSocket from 'ws';
import nodeHttp from 'http';
import { AppRegistry } from './registry';

function ws(server) {
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      const { type, appId, processId } = JSON.parse(message);

      server.connect({
        appId,
        processId,
        send: ({ topic, message }) => {
          if (ws && ws.send && typeof ws.send === 'function') {
            ws.send(JSON.stringify({ topic, message }));
          }
        },
      });
    });
  });
  console.log('ws://localhost:8080');
}

function http(server) {
  nodeHttp
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(server.apps));
    })
    .listen(9876);
}

export class WorkflowServer {
  constructor() {
    this.registry = new AppRegistry();
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.running = true;
      ws(this);
      http(this);
    }
  }

  register(node) {
    return this.registry.register(node);
  }

  unregister() {
    this.registry.unregister();
  }

  update(node) {
    if (node && node.type === 'app') {
      const res = this.registry.findById(node);
      if (res) {
        const { app } = res;
        if (app && app.send && typeof app.send === 'function') {
          node.update(node, { send: app.send, platform: 'linux', wm: 'server' }, node.children);
        }
      }
    }
  }

  connect({ appId, processId, send }) {
    this.registry.connect({ appId, processId, send });
  }

  disconnect({ appId, processId }) {}
}
