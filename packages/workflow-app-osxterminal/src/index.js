/* global Application, delay */

export const Terminal = {
  type: 'app',
  name: 'Terminal',
  params: ['cwd', 'cmd'],
  open: async function open({ cwd, cmd, position }, { run, platform, wm }) {
    if (platform !== 'osx' || wm === 'terminal') {
      throw new Error('Platform is not supported');
    }

    await run(
      (cwd, cmd, position) => {
        const system = Application('System Events');

        const Terminal = Application('Terminal');
        const isRunning = Terminal.running();

        Terminal.activate();

        delay(0.1);

        if (isRunning) {
          system.keystroke('n', { using: 'command down' });
        }

        const window = Terminal.windows[0];
        window.bounds = position;

        if (cwd) {
          Terminal.doScript('cd ' + cwd, { in: window });
          Terminal.doScript('clear', { in: window });
        }
        if (cmd) {
          Terminal.doScript(cmd, { in: window });
        }
      },
      cwd,
      cmd,
      position
    );
  },
};
