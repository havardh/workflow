/* eslint-disable no-unused-vars */
export const emacs = {
  type: 'app',
  name: 'Emacs',
  xClass: 'Emacs',
  params: ['file'],
  open: ({ file }, context, children) => {
    return `emacs -nw ${file}`;
  },
};
