// /home/havard/dev/workflow/packages/workflow-template/flows/Example.js
// md5: c7ecb69bad68f2bcd5d72000c8c3391c
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-env node */
import { Apps } from "workflow-core";
const { Browser, TextEditor } = Apps.defaults;

export default {
  name: 'workflow-example',
  root: {
    layout: 'splith',
    percent: 1.0,
    children: [_extends({}, Browser, { url: 'http://github.com/havardh/workflow/tree/master/packages/workflow-cmd', percent: 0.5 }), _extends({}, TextEditor, { file: __filename, percent: 0.5 })]
  }
};
  