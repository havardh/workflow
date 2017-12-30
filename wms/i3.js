/* eslint-disable no-restricted-syntax */
import { createClient } from 'i3';
import { file } from 'tmp-promise';
import { outputFile } from 'fs-extra';
import shell from 'shelljs';

function matches(expected, actual) {
  const expectedApps = {};
  for (const app of expected) {
    if (expectedApps[app.class]) {
      expectedApps[app.class] += 1;
    } else {
      expectedApps[app.class] = 1;
    }
  }

  const actualApps = {};
  for (const app of actual) {
    if (app) {
      if (actualApps[app]) {
        actualApps[app] += 1;
      } else {
        actualApps[app] = 1;
      }
    }
  }

  for (const app of Object.keys(expectedApps)) {
    if (!actualApps[app] || expectedApps[app] !== actualApps[app]) {
      return false;
    }
  }

  return true;
}

function readCurrentLayout() {
  const result = shell.exec(
   'i3-save-tree | grep "class" | awk \'{print $3}\' | cut -c 3- | rev | cut -c 4- | rev',
    { silent: true },
  );
  return result.stdout
    .replace(/"\^/, '')
    .replace(/\$",/, '')
    .split('\n');
}

export default class I3 {
  constructor() {
    this.client = createClient();
    setTimeout(() => {
      this.client._stream.destroy(); // eslint-disable-line no-underscore-dangle
    }, 10000);
  }

  async apply(config) {
    this.createWorkspace(config);

    // setTimeout(async () => {
    //  if (false && this.isDirty(config.root)) {
    this.clearWorkspace();

    await this.createLayout(config.root);

    this.findApps(config.root)
        .forEach(app => this.open(app));
    // }
    // }, 500);
  }

  isDirty(root) {
    const expected = this.findApps(root);
    const actual = readCurrentLayout();

    return !matches(expected, actual);
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
