'use babel';

import { CompositeDisposable } from 'atom';

import ipc from 'node-ipc';

ipc.config.id = 'workflow-app-atom';
ipc.config.retry = 5000;
ipc.config.maxRetries = 10;
ipc.config.networkHost = '127.0.0.1';
ipc.config.networkfPort = 8002;

const appId = process.env.WORKFLOW_APP_INSTANCE_ID;
const processId = process.pid;
const channelId = 'workflow-server';

function register() {
  return { appId, processId };
}

export default {
  server: null,

  activate(state) {
    this.connectWs();
  },

  connectIpc() {
    ipc.connectToNet('workflow-server', () => {
      this.server = ipc.of['workflow-server'];

      this.server.on('connect', () => this.onConnect());
      this.server.on('disconnect', () => this.onDisconnect());

      this.server.on('workflow.apply', msg => this.onApply(JSON.parse(msg)));
    });
  },

  sendMessage(type, message) {
    this.server.emit(type, JSON.stringify(message));
  },

  onConnect() {
    console.log('workflow.client connected');

    this.sendMessage('workflow.register', register());
  },

  connectWs() {
    const socket = new WebSocket('ws://localhost:8080');

    socket.addEventListener('open', event => {
      console.log('socket opened');

      socket.send(
        JSON.stringify({
          type: 'workflow.register',
          ...register(),
        })
      );
    });

    socket.addEventListener('message', event => {
      const { file } = event.data;

      this.onApply({ file });
    });
  },

  onApply({ file }) {
    const panes = atom.workspace.getPanes();
    const activePane = atom.workspace.getActivePane();

    for (let pane of panes) {
      if (pane !== activePane) {
        pane.destroy();
      }
    }

    atom.workspace.open(file);
  },

  onDisconnect() {
    console.log('workflow.client disconnected');
  },

  deactivate() {
    this.server.disconnect(channelId);
  },
};
