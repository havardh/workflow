/* eslint-env node */
import { Terminal } from 'workflow-apps-defaults';

export default {
  name: 'workflow-example',
  type: 'workspace',
  children: [
    {
      type: 'layout',
      layout: 'splith',
      percent: 1.0,
      children: [
        {
          type: 'async',
          loader: async () => ({
            ...Terminal,
            cwd: __dirname,
            cmd: 'pwd',
            percent: 0.5,
          }),
        },
        {
          type: 'async',
          cwd: __dirname,
          cmd: 'pwd',
          percent: 0.5,
          loader: async props => ({
            ...Terminal,
            ...props,
          }),
        },
      ],
    },
  ],
};
