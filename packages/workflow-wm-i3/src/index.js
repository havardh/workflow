/* eslint-env node */
import { createClient } from 'i3';
import transform from "./transform";
import write from "./write";

class I3 {

  async apply(config) {
    const client = createClient();

    this.createWorkspace(client, config);

    this.clearWorkspace(client);

    await this.createLayout(client, config.root);

    (config.root.length ? config.root : [config.root])
      .forEach(root => this.findApps(root)
      .forEach(app => this.open(client, app)));

    client._stream.destory();
  }

  async screen() {
    const workspaces = await (new Promise((resolve, reject) => {
      const client = createClient();
      client.workspaces((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
        client._stream.destory();
      });
    }));

    return workspaces
      .filter(({visible}) => visible)
      .map(({rect}) => {
        const { x, y, width, height} = rect;
        return {left: x, top: y, width, height };
      })[0];
  }

  createWorkspace(client, config) {
    client.command(`workspace ${config.name}`);
  }

  clearWorkspace(client) {
    client.command('focus parent, focus parent, focus parent, kill');
  }

  async createLayout(client, node) {

    const layout = transform(node);
    const path = await write(layout);

    client.command(`append_layout ${path}`);
  }

  findApps(root) {
    const apps = [];

    if (root.type == "layout") {
      root.children
        .forEach(node => this.findApps(node)
          .forEach(app => apps.push(app)));
    } else if (root.type === "app") {
      return [root];
    }

    return apps;
  }

  open(client, app) {
    client.command(`exec ${app.open(app)}`);
  }
}

module.exports = I3;
