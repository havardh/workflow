export default class WorkflowTransformerAsync {
  async transformBefore(node) {
    switch (node.type) {
      case 'async':
        return await node.loader();
      default:
        return node;
    }
  }
}
