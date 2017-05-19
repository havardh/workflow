/* eslint-disable class-methods-use-this */

export default class Base {

  apply() {
    throw new Error('Not implemented');
  }

  runCmd() {
    throw new Error('Not implemented');
  }

  openNode(node) {
    if (node.children) {
      node.children.forEach(app => this.openNode(app));
    } else {
      this.runCmd(node);
    }
  }

  isSupportedHere() {
    return false;
  }

}
