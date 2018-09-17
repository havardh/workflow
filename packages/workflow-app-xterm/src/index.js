async function evaluate(children, context) {
  const [child] = children;

  const { platform } = context;
  const wm = 'terminal';

  return child.open(child, { platform, wm }, child.children);
}

function escape(string) {
  return string.replace(/'/g, "'\\''");
}

export const XTerm = {
  type: 'app',
  name: 'XTerm',
  params: ['cwd', 'cmd', 'args'],
  open: async ({ cwd, cmd, args }, context, children) => {
    if (cmd && children && children.length) {
      throw new Error('Supports only either cmd or children');
    }

    if (children && children.length > 1) {
      throw new Error('Supports only a single child element');
    }

    if (cmd) {
      const argsString = (args || []).join(' ');
      if (cwd) {
        return `cd ${cwd} && xterm -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
      } else {
        return `xterm -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
      }
    } else if (children && children.length) {
      const command = await evaluate(children, context);
      if (cwd) {
        return `cd ${cwd} && xterm -T '${command}' -e '${command}'`;
      } else {
        return `xterm -T '${escape(command)}' -e '${escape(command)}'`;
      }
    } else {
      if (cwd) {
        return `cd ${cwd} && xterm -ls -hold`;
      } else {
        return 'xterm -ls -hold';
      }
    }
  },
  xClass: 'XTerm',
};
