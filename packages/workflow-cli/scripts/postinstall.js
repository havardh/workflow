#!/usr/bin/env node
/* eslint-disable no-console, no-shadow, consistent-return */

const ncp = require('ncp').ncp;
const os = require('os');
const npm = require('../src/npm');

const source = 'template';
const destination = `${os.homedir()}/.workflow2`;

ncp(source, destination, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('copied');

  npm
    .cwd(destination)
    .install((err) => {
      if (err) {
        return console.error(err);
      }

      console.log('installed');
    });
});
