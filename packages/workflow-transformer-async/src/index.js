export class WorkflowTransformerAsync {
  async transformBefore(node) {
    const { type, loader, ...rest } = node;
    switch (type) {
      case 'async':
        return await loader(rest);
      default:
        return node;
    }
  }
}
