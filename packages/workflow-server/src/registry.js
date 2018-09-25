import uuid from 'uuid';

export class AppRegistry {
  constructor() {
    this.apps = [];
  }

  register(node) {
    if (node.type !== 'app') {
      return node;
    }

    if (this.findById(node)) {
      return { isOpen: true, ...this.findById(node).app, ...node };
    }

    const res = this.findByName(node);
    if (res && res.app && !res.app.appId) {
      const { app, index } = res;
      return (this.apps[index] = { isOpen: true, ...app, ...node, appId: uuid.v4() });
    }

    const newNode = { ...node, appId: uuid.v4(), isOpen: false };
    this.apps.push(newNode);
    return newNode;
  }

  unregister() {
    const newApps = [];
    for (let app of this.apps) {
      if (app.isOpen) {
        newApps.push({ ...app, appId: undefined });
      }
    }
    this.apps = newApps;
  }

  findById({ appId }) {
    if (appId) {
      for (let i in this.apps) {
        if (this.apps[i].appId === appId) {
          return { app: { ...this.apps[i] }, index: i };
        }
      }
    }
    return null;
  }

  findByName({ name }) {
    for (let i in this.apps) {
      if (this.apps[i].name === name && !this.apps[i].appId) {
        return { app: { ...this.apps[i] }, index: i };
      }
    }
    return null;
  }

  connect({ appId, processId, send }) {
    const res = this.findById({ appId });

    if (res) {
      const { app, index } = res;

      return (this.apps[index] = { ...app, processId, send, isOpen: true });
    } else {
      return null;
    }
  }

  disconnect({ appId }) {
    const res = this.findById({ appId });

    if (res) {
      const { app, index } = res;

      return (this.apps[index] = { ...app, processId: undefined, isOpen: false, send: undefined });
    }
  }
}
