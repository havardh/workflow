const vim = {
  type: 'app',
  name: 'vim',
  xClass: 'Vim',
  params: ['file'],
  open: ({ file }, context, children) => {
    if (context.wm !== 'terminal') {
      throw new Error('Context is not supported');
    }

    return `vim ${file}`;
  },
};

export default vim;
