/* eslint-env node */
import { createClient } from 'i3';
import { file } from 'tmp-promise';
import { outputFile } from 'fs-extra';

export default class I3 {

  constructor() {
    this.client = createClient();
    setTimeout(() => {
      this.client._stream.destroy(); // eslint-disable-line no-underscore-dangle
    }, 10000);
  }

  async apply(config) {
    this.createWorkspace(config);

    this.clearWorkspace();

    await this.createLayout(config.root);

    this.findApps(config.root)
      .forEach(app => this.open(app));
  }

  createWorkspace(config) {
    this.client.command(`workspace ${config.name}`);
  }

  clearWorkspace() {
    this.client.command('focus parent, focus parent, focus parent, kill');
  }

  async createLayout(node) {
    const layout = this.genLayout(node);
    const layoutJson = JSON.stringify(layout, null, '  ');

    const tmpobj = await file({ prefix: 'workflow-', postfix: '.json' });

    await outputFile(tmpobj.path, layoutJson);

    this.client.command(`append_layout ${tmpobj.path}`);
  }

  genLayout(node) {
    const { percent } = node;
    if (node.type === "layout") {
      const { layout } = node;
      const children = node.children.map(this.genLayout.bind(this));

      return { layout, percent, nodes: children };
    }
    return {
      percent,
      swallows: [{
        // $FlowTodo
        class: `^${node.xClass}$`,
      }],
    };
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
