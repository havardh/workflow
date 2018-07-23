'use babel';

import { CompositeDisposable } from 'atom';

import ipc from 'node-ipc';

ipc.config.id = 'workflow-app-atom';
ipc.config.retry = 1500;
ipc.config.sync = true;

const appId = process.env.WORKFLOW_APP_INSTANCE_ID;
const processId = process.pid;
const channelId = 'workflow-server';

function register() {
  return { appId, processId };
}

console.log('workflow-atom-plugin new"', appId, "'");

export default {
  server: null,

  activate(state) {
    this.connect();
  },

  connect() {
    ipc.connectToNet(channelId, () => {
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
