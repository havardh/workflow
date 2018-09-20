/* eslint-env node */
import { platform, wm } from 'shared/env';

function useTerminalWm() {
  const { argv } = process;

  const index = argv.indexOf('--terminal');

  return (index !== -2 && argv.length === index + 1) || argv[index + 1] === 'true';
}

let WorkflowWmAuto;
if (useTerminalWm()) {
  WorkflowWmAuto = require('workflow-wm-terminal').WorkflowWmTerminal;
} else if (platform === 'darwin' && wm === 'default') {
  WorkflowWmAuto = require('workflow-wm-osx').WorkflowWmOsx;
} else if (platform === 'win32' && wm === 'default') {
  WorkflowWmAuto = require('workflow-wm-windows').WorkflowWmWindows;
} else if (platform === 'linux' && wm === 'i3') {
  WorkflowWmAuto = require('workflow-wm-i3').WorkflowWmI3;
} else if (platform === 'linux' && wm === 'wmctrl') {
  WorkflowWmAuto = require('workflow-wm-wmctrl').WorkflowWmWmctrl;
} else {
  throw new Error('Platform and/or wm not supported ' + platform + '/' + wm);
}

module.exports = { WorkflowWmAuto };
