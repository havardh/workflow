#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable global-require */

try {
  require("./dist/index")
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    require("./src/index");
  } else {
    throw error;
  }
}
