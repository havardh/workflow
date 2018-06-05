/* eslint-env node */
import { createClient } from 'i3';
import transform from "./transform";
import write from "./write";

class I3 {

  constructor() {
    this.client = createClient();
    setTimeout(() => {
      this.client._stream.destroy();
    }, 4000);
  }

  async apply(config) {
    this.createWorkspace(config);

    this.clearWorkspace();

    await this.createLayout(config.root);


    (config.root.length ? config.root : [config.root])
      .forEach(root => this.findApps(root)
      .forEach(app => this.open(app)));
  }

  async screen() {
    const workspaces = await (new Promise((resolve, reject) => {
      this.client.workspaces((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    }));

    return workspaces
      .filter(({visible}) => visible)
      .map(({rect}) => {
        const { x, y, width, height} = rect;
        return {left: x, top: y, width, height };
      })[0];
  }

  createWorkspace(config) {
    this.client.command(`workspace ${config.name}`);
  }

  clearWorkspace() {
    this.client.command('focus parent, focus parent, focus parent, kill');
  }

  async createLayout(node) {

    const layout = transform(node);
    const path = await write(layout);

    this.client.command(`append_layout ${path}`);
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

  open(app) {
    this.client.command(`exec ${app.open(app)}`);
  }
}

module.exports = I3;
