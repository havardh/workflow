/* eslint-env node */
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

const env = require('shared/env');

const { platform, wm } = env;

module.exports = require(`./.config.js/config.${platform}-${wm}.js`);
