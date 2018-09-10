export default class WorkflowTransformerAsync {
  async transformBefore(node) {
    const { type, loader, ...rest } = node;
    switch (type) {
      case 'async':
        return { ...rest, ...(await loader()) };
      default:
        return node;
    }
  }
}
