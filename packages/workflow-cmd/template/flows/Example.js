/* eslint-env node */
import { TextEditor, Browser} from "workflow-core/src/apps/defaults";

export default {
  name: 'workflow-example',
  root: {
    layout: 'splith',
    percent: 1.0,
    children: [
      { ...Browser, url: 'http://github.com/havardh/workflow/tree/master/packages/workflow-cmd', percent: 0.5 },
      { ...TextEditor, file: __filename, percent: 0.5 },
    ],
  },
};
