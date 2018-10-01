import uuid from 'uuid';
import { findAllApps } from 'shared/tree';

export class AppRegistry {
  constructor() {
    this.apps = [];
    this.subscribers = {};
  }

  register(node) {
    if (node.type === 'workspace') {
      this.unregister();
    }

    if (node.type === 'app') {
      return this.registerApp(node);
    } else {
      return { ...node, children: node.children.map(this.register.bind(this)) };
    }
  }

  updateRegister(flow) {
    const apps = findAllApps(flow);

    for (let { appId, windowId } of apps) {
      const { app, index } = this.findById({ appId });

      this.apps[index] = { ...app, windowId };
    }
  }

  registerApp(node) {
    if (node.type !== 'app') {
      return node;
    }

    if (this.findById(node)) {
      return { ...this.findById(node).app, ...node, isOpen: true, used: true };
    }

    const res = this.findByName(node);
    if (res) {
      const { app, index } = res;
      return (this.apps[index] = { ...app, ...node, isOpen: true, used: true });
    }

    const newNode = { ...node, appId: uuid.v4(), isOpen: false, used: true };
    this.apps.push(newNode);
    return newNode;
  }

  unregister() {
    const newApps = [];
    for (let app of this.apps) {
      newApps.push({ ...app, used: false });
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
      if (this.apps[i].name === name && !this.apps[i].used) {
        return { app: { ...this.apps[i] }, index: i };
      }
    }
    return null;
  }

  waitFor({ appId }) {
    const { index, app } = this.findById({ appId });

    if (app.send) {
      return app;
    }

    return new Promise(resolve => {
      this.subscribers[appId] = this.subscribers[appId] || [];

      this.subscribers[appId].push(app => {
        resolve(app);
      });
    });
  }

  connect({ appId, processId, send }) {
    const res = this.findById({ appId });

    if (res) {
      const { app, index } = res;
      const newApp = { ...app, processId, send, isOpen: true };
      for (let subscriber of this.subscribers[appId] || []) {
        subscriber(newApp);
      }
      return (this.apps[index] = newApp);
    } else {
      console.log('Uknown app', appId);
      return null;
    }
  }

  disconnect({ appId }) {
    const res = this.findById({ appId });

    if (res) {
      const { app, index } = res;

      this.apps.splice(index, 1);
    }
  }
}
