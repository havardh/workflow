/* eslint-env node */
const { readFileSync } = require('fs');

function requireAsJson(file) {
  return JSON.parse(readFileSync(file, 'utf-8'));
}

module.exports = { requireAsJson };
