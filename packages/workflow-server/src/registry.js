export class AppRegistry {
  constructor() {
    this.apps = [];
  }

  register(node) {
    if (node.type !== 'app') {
      return node;
    }
    const { appId, name, open, update } = node;

    if (this.findById({ appId })) {
      return { ...this.findById({ appId }), ...node, open, update, isOpen: true };
    }

    const app = this.findByName({ name });
    if (app && !app.appId) {
      const i = this.apps.indexOf(app);
      const newApp = { ...app, ...node, appId: uuid.v4(), open, update, isOpen: true };
      this.apps[i] = newApp;
      return newApp;
    }

    const newNode = { ...node, appId: uuid.v4(), open, update, isOpen: false };
    this.apps.push(newNode);
    return newNode;
  }

  unregister() {
    const newApps = [];
    for (let app in this.apps) {
      const { open, update } = app;
      newApps.push({ ...app, open, update, appId: undefined });
    }
    this.apps = newApps;
  }

  findById({ appId }) {
    for (let app of this.apps) {
      if (app.appId === appId) {
        return app;
      }
    }
    return null;
  }

  findByName({ name }) {
    for (let app of this.apps) {
      if (app.name === name && !app.appId) {
        return app;
      }
    }
    return null;
  }

  connect({ appId, processId, send }) {
    const app = this.findById({ appId });

    if (app) {
      const i = this.apps.indexOf(app);

      this.apps[i] = { ...app, processId, send };
    }
  }

  disconnect({ appId }) {}
}
