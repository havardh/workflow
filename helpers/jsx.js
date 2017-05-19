const React = {
  createElement(node, args, ...rest) {
    if (args) {
      if (args.name) {
        return node({
          ...args,
          root: rest[0],
        });
      }
      return node({
        percent: 0.5,
        ...args,
      });
    }
    return node({
      percent: 0.5,
      children: [...rest],
    });
  },
};

export default React;
