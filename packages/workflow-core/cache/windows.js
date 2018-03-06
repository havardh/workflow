// examples/windows.js
// md5: 7149a3646a753ccc673c2143c22cb5e5
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = require('../src/helpers/jsx');

var _jsx2 = _interopRequireDefault(_jsx);

var _layout = require('../src/layout');

var _index = require('../src/index');

var _windows = require('../src/apps/windows');

var _advisor = require('../src/helpers/advisor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const workspace = _jsx2.default.createElement(
  _index.Workspace,
  { args: 'file', name: 'windows' },
  _jsx2.default.createElement(
    _layout.SplitV,
    null,
    _jsx2.default.createElement(_windows.Notepad, { file: ({ file }) => file }),
    _jsx2.default.createElement(_windows.IExplorer, { url: 'rust-lang.org' })
  )
); /* eslint-disable no-unused-vars */
exports.default = workspace;
  