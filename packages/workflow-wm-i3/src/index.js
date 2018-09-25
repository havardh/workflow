/* eslint-env node */
import { createClient } from 'i3';
import { transform } from './transform';
import { write } from './write';
import { join } from 'path';
import execa from 'execa';

// https://stackoverflow.com/questions/151407/how-to-get-an-x11-window-from-a-process-id
export class WorkflowWmI3 {
  constructor() {}

  async apply(config) {
    this.client = createClient();
    this.createOrGoToWorkspace(config);

    //this.clearWorkspace();

    await this.applyLayout(config.children[0]);

    config.children.forEach(root => this.findApps(root).forEach(app => this.open(app)));

    setTimeout(() => {
      this.client._stream.destroy();
    }, 4000);
    return config;
  }

  async screen() {
    const client = createClient();

    const workspaces = await new Promise((resolve, reject) => {
      client.workspaces((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
        client._stream.destroy();
      });
    });

    return workspaces.filter(({ visible }) => visible).map(({ rect }) => {
      const { x, y, width, height } = rect;
      return { left: x, top: y, width, height };
    })[0];
  }

  createOrGoToWorkspace(config) {
    this.client.command(`workspace --no-auto-back-and-forth ${config.name}`);
  }

  clearWorkspace() {}

  async applyLayout(node) {
    const layout = transform(node);
    const path = await write(layout);

    await execa(join(__dirname, '../scripts/i3-apply-layout'), [path]);
  }

  findApps(root) {
    const apps = [];

    if (root.type == 'layout') {
      root.children.forEach(node => this.findApps(node).forEach(app => apps.push(app)));
    } else if (root.type === 'app') {
      return [root];
    }

    return apps;
  }

  async open(app) {
    console.log(app.name, app.isOpen);
    if (!app.isOpen) {
      const context = { platform: 'linux', wm: 'i3' };
      this.client.command(`exec ${await app.open(app, context, app.children)}`);
    }
  }
}
