const vim = {
  type: 'app',
  name: 'vim',
  xClass: 'Vim',
  params: ['file'],
  open: ({ file }, { wm }) => {
    if (wm !== 'terminal') {
      throw new Error('Context is not supported');
    }

    return `vim ${file}`;
  },
};

export default vim;
