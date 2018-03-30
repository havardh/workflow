// @flow
/* eslint-disable class-methods-use-this */

import type { Config, Node, App } from '../parser/config';

function waitFor(millis) {
  const waitTill = new Date(new Date().getTime() + (millis));

  while (waitTill > new Date());
}

export default class Base {

  apply(config: Config) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  runCmd(app: App) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  async openNode(node: Node) {
    if (node.children) {
      const promises = [];
      for (const child of node.children) {
        const promise = await this.openNode(child)
        waitFor(10);
        promises.push(promise);
      }


      return Promise.all(promises);
    }
    const pid = await this.runCmd(node);
    node.pid = pid; // eslint-disable-line no-param-reassign

    return Promise.resolve(node);
  }

  isSupportedHere() {
    return false;
  }

}
