#!/usr/bin/env node
/* eslint-env node */

require('babel-polyfill');
require('babel-register')({
  presets: [
    'flow',
    'react',
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['transform-object-rest-spread', 'transform-class-properties'],
});

function cli(context) {
  context.userFolder = __dirname;

  require('workflow-core/cli').cli(context);
}

if (require.main === module) {
  cli({});
}

module.exports = { cli };
