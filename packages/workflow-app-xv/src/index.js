/* eslint-disable no-unused-vars */
export const XV = {
  type: 'app',
  name: 'xv',
  xClass: 'XVroot',
  params: ['file'],
  open: ({ file }, context, children) => {
    return `xv ${file}`;
  },
};
