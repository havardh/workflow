/* eslint-env node */
import { Browser, TextEditor } from 'workflow-apps-defaults';

export const flow = {
  name: 'workflow-example',
  type: 'workspace',
  children: [
    {
      type: 'layout',
      layout: 'splith',
      percent: 1.0,
      children: [
        {
          ...Browser,
          url: 'http://github.com/havardh/workflow/tree/master/packages/workflow-cmd',
          percent: 0.5,
        },
        { ...TextEditor, file: __filename, percent: 0.5 },
      ],
    },
  ],
};
