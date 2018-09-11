import clipboardy from 'clipboardy';

export default class WorkflowResolverClipboard {
  constructor() {}

  async alternatives() {
    return [];
  }

  async resolve(path, { args }) {
    if (args.clipboard) {
      const source = await clipboardy.read();
      return { source };
    } else {
      throw new Error('Not enabled');
    }
  }
}
