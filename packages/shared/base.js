/* eslint-disable class-methods-use-this */

function waitFor(millis) {
  const waitTill = new Date(new Date().getTime() + (millis));

  while (waitTill > new Date());
}

export default class Base {

  apply(config) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  runCmd(app) { // eslint-disable-line no-unused-vars
    throw new Error('Not implemented');
  }

  async openNode(node) {
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
