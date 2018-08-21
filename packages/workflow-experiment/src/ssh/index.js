async function openNode(node, context) {
  return await node.open(node, context, node.children);
}

const Ssh = {
  type: 'app',
  name: 'Ssh',
  open: async function({ user, host }, context, children) {
    const { platform, wm } = context;
    if (wm !== 'terminal') {
      throw new Error('Context not supported');
    }

    if (children.length === 0) {
      return `ssh ${user}@${host}`;
    }

    if (children.length !== 1) {
      throw new Error('Supports only a single child');
    }

    const childCmd = await openNode(children[0], context);

    return `ssh -t ${user}@${host} '${childCmd}'`;
  },
};

export default Ssh;
