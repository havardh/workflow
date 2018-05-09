/* eslint-env node */
/* eslint-disable global-require */

const req = require.context("./", false, /^dist$/);
if (req.keys().includes("./dist")) {
  module.exports = req("./dist");
} else {
  module.exports = require("./src/index");
}
