/* eslint-disable no-unused-vars */
export const Gedit = {
  type: 'app',
  name: 'Gedit',
  xClass: 'Emacs',
  params: ['file'],
  open: async ({ file, position }, context, children) => {
    const { run } = context;

    await run({ cmd: 'gedit', args: ['--new-window', file], position, className: 'gedit.Gedit' });
  },
};
