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
      node.children.forEach(app => this.openNode(app));
    } else {
      const pid = await this.runCmd(node);
      node.pid = pid; // eslint-disable-line no-param-reassign
    }
  }

  isSupportedHere() {
    return false;
  }

}
