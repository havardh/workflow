#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-console */

const ncp = require("ncp").ncp;
const os = require("os");
const npm = require("../src/npm");
const source = "template";
const destination = `${os.homedir()}/.workflow`;

ncp(source, destination, err => {
  if (err) {
    return console.error(err);
  }
  console.log("copied");

  npm
    .cwd(destination)
    .install(err => {
      if (err) {
        return console.error(err);
      }

      console.log("installed");
    });

});
