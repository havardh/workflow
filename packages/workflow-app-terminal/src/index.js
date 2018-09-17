import { Terminal as DefaultTerminal } from 'workflow-apps-defaults';

async function evaluate(children, context) {
  const [child] = children;

  const { platform } = context;
  const wm = 'terminal';

  return await child.open(child, { platform, wm }, child.children);
}

export const Terminal = {
  type: 'app',
  name: 'Terminal',
  xClass: 'XTerm',
  params: ['cwd', 'cmd'],
  open: async ({ cwd, cmd, args, ...rest }, context, children) => {
    if (context.wm === 'terminal') {
      return `cd ${cwd || ''}; clear; ${cmd || (await evaluate(children, context))}`;
    } else {
      return DefaultTerminal.open({ cwd, cmd, args, ...rest }, context, children);
    }
  },
};
