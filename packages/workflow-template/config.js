/* eslint-env node */
const env = require("shared/env");

const {platform, wm} = env;

module.exports = require(`./.config.js/config.${platform}-${wm}.js`);
