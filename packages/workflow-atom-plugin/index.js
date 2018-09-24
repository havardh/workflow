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
      console.log(event);

      const { topic, message } = JSON.parse(event.data);

      const { file } = message;

      this.onApply({ file });
    });
  },

  onApply({ file }) {
    console.log('opening file', file);
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
