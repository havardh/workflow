const Ssh = {
  type: 'app',
  name: 'Ssh',
  open: async function({ user, host }, context, children) {
    const { wm } = context;
    if (wm !== 'terminal') {
      throw new Error('Context not supported');
    }

    if (!children || children.length === 0) {
      return `ssh ${user}@${host}`;
    }

    if (children && children.length !== 1) {
      throw new Error('Supports only a single child');
    }

    const [child] = children;
    const cmd = await child.open(child, context, child.children);

    return `ssh -t ${user}@${host} '${cmd}'`;
  },
};

export default Ssh;
