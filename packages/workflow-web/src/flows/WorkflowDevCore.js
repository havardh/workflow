import { defaults } from 'workflow-apps-html';
const { TextEditor, Terminal } = defaults;

export default {
  name: 'workflow-dev-core',
  type: 'workspace',
  children: [
    {
      type: 'layout',
      layout: 'splitv',
      percent: 1.0,
      children: [
        { ...TextEditor, file: '/home/user/dev/workflow/index.js', percent: 0.66 },
        { ...Terminal, cwd: '/home/user/dev/workflow', percent: 0.34 },
      ],
    },
  ],
};
