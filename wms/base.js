/* eslint-disable class-methods-use-this */

export default class Base {

  apply() {
    throw new Error('Not implemented');
  }

  runCmd() {
    throw new Error('Not implemented');
  }

  async openNode(node) {
    if (node.children) {
      return Promise.all(node.children.map(async app => this.openNode(app)));
    }
    const pid = await this.runCmd(node);
    node.pid = pid; // eslint-disable-line no-param-reassign
  }

  isSupportedHere() {
    return false;
  }

}
