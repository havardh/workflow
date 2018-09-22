import uuid from 'uuid';
import * as ipc from './ipc';
import WebSocket from 'ws';
import nodeHttp from 'http';

function ws(server) {
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      const { type, appId, processId } = JSON.parse(message);
      console.log('register', { type, appId, processId });

      server.connect({
        appId,
        processId,
        send: ({ topic, message }) => {
          ws.send(JSON.stringify({ topic, message }));
        },
      });
    });
  });
  console.log('ws://localhost:8080');
}

/*function startIpc(server) {
  ipc.on('workflow.register', (data, socket, server) => {
    const { appId, processId } = JSON.parse(data);

    server.connect({
      appId,
      processId,
      send: ({ topic, message }) => {
        server.emit(socket, topic, JSON.stringify(message));
      },
    });
  });
}*/

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
    this.apps = [];
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.running = true;
      ws(this);
      //startIpc(this);
      http(this);
    }
  }

  register(node) {
    if (node.type !== 'app') {
      return node;
    }
    const { appId, name, open, update } = node;

    if (this.findById({ appId })) {
      return { ...this.findById({ appId }), ...node, open, update };
    }

    const app = this.findByName({ name });
    if (app && !app.appId) {
      const i = this.apps.indexOf(app);
      const newApp = { ...app, ...node, appId: uuid.v4(), open, update };
      this.apps[i] = newApp;
    }

    const newNode = { ...node, appId: uuid.v4(), open, update };
    this.apps.push(newNode);
    return newNode;
  }

  unregister(node) {
    if (node.type !== 'app') {
      return node;
    }

    const app = this.findById(node);

    if (app) {
      const i = this.apps.indexOf(app);

      this.apps[i] = { ...app, appId: undefined };
      return this.apps[i];
    }

    return { node, appId: undefined };
  }

  findById({ appId }) {
    for (let app of this.apps) {
      if (app.appId === appId) {
        return app;
      }
    }
    return null;
  }

  update(node, oldProps, newProps) {
    if (node && node.type === 'app') {
      const app = this.findById(node);

      if (newProps && app && app.send && typeof app.send === 'function') {
        node.update(newProps, { send: app.send, platform: 'linux', wm: 'server' });
      }
    }
  }

  findByName({ name }) {
    for (let app of this.apps) {
      if (app.name === name) {
        return app;
      }
    }
    return null;
  }

  connect({ appId, processId, send }) {
    const app = this.findById({ appId });

    if (app) {
      app.processId = processId;
      app.send = send;
    }
  }

  disconnect({ appId, processId }) {}
}
