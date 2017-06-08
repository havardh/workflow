// @flow
/* eslint-disable class-methods-use-this */

import type { Config, Node, App } from '../parser/config';

export default class Base {

  apply(config: Config) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  runCmd(app: App) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  async openNode(node: Node) {
    if (node.children) {
      return Promise.all(node.children.map(async app => this.openNode(app)));
    }
    const pid = await this.runCmd(node);
    node.pid = pid; // eslint-disable-line no-param-reassign
    return Promise.resolve(node);
  }

  isSupportedHere() {
    return false;
  }

}
