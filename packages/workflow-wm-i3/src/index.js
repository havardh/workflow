/* eslint-env node */
import { createClient } from 'i3';
import { transform } from './transform';
import { write } from './write';
import execa from 'execa';

async function openNode(node, context) {
  return await node.open(node, context, node.children);
}

// https://stackoverflow.com/questions/151407/how-to-get-an-x11-window-from-a-process-id
export class WorkflowWmI3 {
  constructor() {
    this.client = createClient();
    setTimeout(() => {
      this.client._stream.destroy();
    }, 4000);
  }

  async apply(config) {
    this.createOrGoToWorkspace(config);

    this.clearWorkspace();

    await this.applyLayout(config.children[0]);

    config.children.forEach(root => this.findApps(root).forEach(app => this.open(app)));

    return config;
  }

  async screen() {
    const workspaces = await new Promise((resolve, reject) => {
      this.client.workspaces((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
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

  async applyLayout(node) {
    const layout = transform(node);
    const path = await write(layout);

    await execa('../scripts/i3-apply-layout', [path]);
    // this.client.command(`append_layout ${path}`);
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
    const context = { platform: 'linux', wm: 'i3' };
    const open = await openNode(app, context);
    this.client.command(`exec ${open}`);
  }
}
