import { createClient } from 'i3';
import { fileSync } from 'tmp';
import { writeFileSync } from 'fs';

export default class I3 {
  constructor() {
    this.client = createClient();
    setTimeout(() => {
      this.client._stream.destroy(); // eslint-disable-line no-underscore-dangle
    }, 10000);
  }

  apply(config) {
    this.createWorkspace(config);

    this.clearWorkspace();

    this.createLayout(config.root);

    this.findApps(config.root)
      .forEach(app => this.open(app));
  }

  createWorkspace(config) {
    this.client.command(`workspace ${config.name}`);
  }

  clearWorkspace() {
    this.client.command('focus parent, focus parent, focus parent, kill');
  }

  createLayout(node) {
    const layout = this.genLayout(node);
    const layoutJson = JSON.stringify(layout, null, '  ');

    const tmpobj = fileSync({ prefix: 'workflow-', postfix: '.json' });

    writeFileSync(tmpobj.fd, layoutJson);

    this.client.command(`append_layout ${tmpobj.name}`);
  }

  genLayout(node) {
    const { percent } = node;
    if (node.layout) {
      const { layout } = node;
      const children = node.children.map(this.genLayout.bind(this));

      return { layout, percent, nodes: children };
    }
    return {
      percent,
      swallows: [{
        class: `^${node.class}$`,
      }],
    };
  }

  findApps(root) {
    const apps = [];

    if (root.children) {
      root.children
        .forEach(node => this.findApps(node)
          .forEach(app => apps.push(app)));
    } else if (root.open) {
      return [root];
    }

    return apps;
  }

  open(app) {
    this.client.command(`exec ${app.open}`);
  }

}
