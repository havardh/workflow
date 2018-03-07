// /home/havard/dev/workflow/packages/workflow-cli/template/flows/Example.js
// md5: 46461a7e14368fdc06e77f1d880958b3
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _user = require('../apps/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code = {
  class: 'Code',
  open: function open(_ref) {
    var file = _ref.file;
    return 'code -n ' + file;
  }
};
var Chrome = {
  class: 'Google-chrome',
  open: function open(_ref2) {
    var url = _ref2.url;
    return 'google-chrome-stable --new-window ' + url;
  }
};

exports.default = {
  name: 'workflow-example',
  root: {
    layout: 'splith',
    percent: 1.0,
    children: [_extends({}, Chrome, { url: 'github.com/havardh/workflow/tree/master/packages/workflow-cli', percent: 0.5 }), _extends({}, Code, { file: __filename, percent: 0.5 })]
  }
};
  