#!/usr/bin/env node

const ncp = require('ncp').ncp;
const os = require('os');

const source = 'template';
const destination = `${os.homedir()}/.workflow2`;

ncp(source, destination, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});
