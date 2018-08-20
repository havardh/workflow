const less = {
  type: 'app',
  name: 'Less',
  params: ['file', 'follow'],
  open: ({ file, follow }, context, children) => {
    if (context.wm !== 'terminal') {
      throw new Error('Context not supported');
    }

    if (follow) {
      return `less -f ${file}`;
    }

    return `less ${file}`;
  },
};

export default less;
