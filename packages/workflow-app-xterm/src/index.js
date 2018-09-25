async function evaluate(children, context) {
  const [child] = children;

  const { platform } = context;
  const wm = 'terminal';

  return child.open(child, { platform, wm }, child.children);
}

function escape(string) {
  return string.replace(/'/g, "'\\''");
}

function parseStyle(style) {
  let options = '';

  if (style) {
    const { fontSize, fontFamily } = style;
    if (fontSize) {
      options += '-fs ' + fontSize;
    }

    if (fontFamily) {
      options += ' -fa ' + fontFamily;
    }
  }

  return options;
}

export const XTerm = {
  type: 'app',
  name: 'XTerm',
  params: ['cwd', 'cmd', 'args', 'style'],
  open: async ({ cwd, cmd, args, style }, context, children) => {
    if (cmd && children && children.length) {
      throw new Error('Supports only either cmd or children');
    }

    if (children && children.length > 1) {
      throw new Error('Supports only a single child element');
    }

    const styleOptions = parseStyle(style);

    if (cmd) {
      const argsString = (args || []).join(' ');
      if (cwd) {
        return `cd ${cwd} && xterm ${styleOptions} -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
      } else {
        return `xterm ${styleOptions} -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
      }
    } else if (children && children.length) {
      const command = await evaluate(children, context);
      if (cwd) {
        return `cd ${cwd} && xterm ${styleOptions} -T '${command}' -e '${command}'`;
      } else {
        return `xterm ${styleOptions} -T '${escape(command)}' -e '${escape(command)}'`;
      }
    } else {
      if (cwd) {
        return `cd ${cwd} && xterm ${styleOptions} -ls -hold`;
      } else {
        return `xterm ${styleOptions} -ls -hold`;
      }
    }
  },
  xClass: 'XTerm',
};
