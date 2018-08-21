import P from './plugins/index';

export const File = {
  type: 'app',
  name: 'File',
  open: ({ file }) => `(find-file "${file}")`,
};

export const Plugins = P;
