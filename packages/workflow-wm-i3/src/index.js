/* eslint-env node */
import { createClient } from 'i3';
import { transform } from './transform';
import { write } from './write';
import { join } from 'path';
import execa from 'execa';

// https://stackoverflow.com/questions/151407/how-to-get-an-x11-window-from-a-process-id
export class WorkflowWmI3 {
  constructor() {
    this.client = createClient();
  }

  async apply(config) {
    this.createOrGoToWorkspace(config);

    this.clearWorkspace();

    await this.applyLayout(config.children[0]);

    config.children.forEach(root => this.findApps(root).forEach(app => this.open(app)));

    return config;
  }

  async wrap(node) {
    node.open = async function(props) {
      switch (props.type) {
        case 'workspace':
          console.log('open workspace', props);
          this.client.command(`workspace --no-auto-back-and-forth ${props.name}`);
          break;
        case 'app':
          console.log('open app', props);
          const context = { platform: 'linux', wm: 'i3' };
          this.client.command(`exec ${await props.open(props, context, props.children)}`);
          break;
      }
    };
  }

  async update(node, oldProps, newProps) {
    if (node.type === 'workspace') {
      this.createOrGoToWorkspace(node);
      this.applyLayout(node.children[0]);
    }
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
    const context = { platform: 'linux', wm: 'i3' };
    this.client.command(`exec ${await app.open(app, context, app.children)}`);
  }
}
