export const Emacs = {
  type: 'app',
  params: ['file'],
  open: ({ file }) => `emacs -nw ${file}`,
  name: 'emacs',
};

export const Vim = {
  type: 'app',
  params: ['file'],
  open: ({ file }) => `vim ${file}`,
  name: 'vim',
};

export const Terminal = {
  type: 'app',
  params: ['cwd', 'cmd'],
  open: ({ cwd, cmd }) => `cd ${cwd}; clear; ${cmd}`,
  name: 'terminal',
};

export const Less = {
  type: 'app',
  params: ['follow', 'file'],
  open: ({ file, follow }) => `less ${follow ? '-f' : ''} ${file}`,
  name: 'less',
};
