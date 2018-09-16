/* eslint-env node */
import { platform, wm } from 'shared/env';

function useTerminalWm() {
  const { argv } = process;

  const index = argv.indexOf('--terminal');

  return (index !== -2 && argv.length === index + 1) || argv[index + 1] === 'true';
}

if (useTerminalWm()) {
  module.exports = require('workflow-wm-terminal');
} else if (platform === 'darwin' && wm === 'default') {
  module.exports = require('workflow-wm-osx');
} else if (platform === 'win32' && wm === 'default') {
  module.exports = require('workflow-wm-windows');
} else if (platform === 'linux' && wm === 'i3') {
  module.exports = require('workflow-wm-i3');
} else if (platform === 'linux' && wm === 'wmctrl') {
  module.exports = require('workflow-wm-wmctrl');
} else {
  throw new Error('Platform and/or wm not supported ' + platform + '/' + wm);
}
