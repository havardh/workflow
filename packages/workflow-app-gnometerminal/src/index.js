/* eslint-env node */
/* eslint-disable no-unused-vars */
export const GnomeTerminal = {
  type: 'app',
  name: 'GnomeTerminal',
  params: ['cmd', 'cwd'],
  open: async ({ cmd, cwd, position }, context, children) => {
    const { run } = context;

    await run({
      cmd: 'gnome-terminal',
      args: [
        '--working-directory',
        cwd || process.cwd(),
        '-e',
        `"bash -c '${cmd || ''} && $SHELL'"`,
      ],
      position,
      className: 'gnome-terminal.Gnome-terminal',
    });
  },
};
