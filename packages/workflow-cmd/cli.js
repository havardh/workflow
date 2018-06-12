#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */

try {
  require("./dist/cli")
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    require("./src/cli");
  } else {
    throw error;
  }
}
