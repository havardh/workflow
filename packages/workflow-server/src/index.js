import uuid from 'uuid';
import WebSocket from 'ws';
import nodeHttp from 'http';
import { AppRegistry } from './registry';

function ws(server) {
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', function connection(ws) {
    let clientAppId;

    ws.on('message', function incoming(message) {
      const { type, appId, processId } = JSON.parse(message);

      clientAppId = appId;
      server.connect({
        appId,
        processId,
        send: ({ topic, message }) => {
          if (ws && ws.send && typeof ws.send === 'function') {
            console.log('sending:', JSON.stringify({ topic, message }));
            ws.send(JSON.stringify({ topic, message }));
          }
        },
      });
    });

    ws.on('close', function disconnect() {
      server.disconnect({ appId: clientAppId });
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

  async waitFor(app) {
    return await this.registry.waitFor(app);
  }

  register(flow) {
    this.registry.unregister();
    return this.registry.register(flow);
  }

  updateRegister(node) {
    if (node.type === 'app') {
      this.registry.updateRegister(node);
    }

    for (let child of node.children || []) {
      this.updateRegister(child);
    }
  }

  connect({ appId, processId, send }) {
    console.log('Client connected', appId);
    this.registry.connect({ appId, processId, send });
  }

  disconnect({ appId, processId }) {
    console.log('Client disconnected', appId);
    this.registry.disconnect({ appId });
  }
}
