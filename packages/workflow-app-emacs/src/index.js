import { open as unixOpen } from './common/open';
import { open as windows } from './windows/index';
import { open as osx } from './osx/index';
import { File, Plugins } from './components/index';

import { platform } from 'shared/apps';

export const Emacs = {
  type: 'app',
  name: 'Emacs',
  xClass: 'Emacs',
  params: ['file'],
  open: platform({
    'osx-default': osx,
    'windows-default': windows,
    'linux-i3': ({ file }, ctx, children) => unixOpen({ file, flags: '' }, ctx, children),
    'linux-wmctrl': ({ file }, ctx, children) => unixOpen({ file, flags: '' }, ctx, children),
    '*-terminal': ({ file }, ctx, children) => unixOpen({ file, flags: '-nw' }, ctx, children),
  }),
};

export { File, Plugins };
