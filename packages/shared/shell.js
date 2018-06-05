/* eslint-disable import/prefer-default-export */
/* eslint-env node */

const shell = require('shelljs');

function exec(cmd, async = true) {
  return shell.exec(cmd, { silent: true, async: async });
}

function which(cmd) {
  return shell.exec(`which ${cmd}`, { silent: true, async: false });
}

module.exports = { which, exec };
