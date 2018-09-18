/* eslint-disable no-unused-vars */
const XV = {
  type: 'app',
  name: 'xv',
  xClass: 'XVroot',
  params: ['file'],
  open: ({ file }, context, children) => {
    return `xv ${file}`;
  },
};

export default XV;
