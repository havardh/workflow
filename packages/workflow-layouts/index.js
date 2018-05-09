/* eslint-env node */
function SplitV(config) {
  return { type: "layout", layout: 'splitv', ...config };
}

function SplitH(config) {
  return { type: "layout", layout: 'splith', ...config };
}

module.exports = { SplitV, SplitH };
