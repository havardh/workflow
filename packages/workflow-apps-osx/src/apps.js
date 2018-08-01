/* global Application, delay */

export const Terminal = {
  type: 'app',
  params: ['cwd', 'cmd'],
  open: function open(app) {
    const system = Application('System Events');

    const Terminal = Application('Terminal');
    const isRunning = Terminal.running();

    Terminal.activate();

    delay(0.1);

    if (isRunning) {
      system.keystroke('n', { using: 'command down' });
    }

    const window = Terminal.windows[0];

    if (app.cwd) {
      Terminal.doScript('cd ' + app.cwd, { in: window });
      Terminal.doScript('clear', { in: window });
    }
    if (app.cmd) {
      Terminal.doScript(app.cmd, { in: window });
    }

    return window;
  },
  name: 'Terminal',
};

export const ITerm2 = {
  type: 'app',
  params: ['cwd', 'cmd'],
    open: function open(app) {
      const iTerm = Application('iTerm');
      if (iTerm.running()) {
        const window = iTerm.createWindowWithDefaultProfile();
        window.select();
      }

      const window = iTerm.windows[0];

      const pane = window.currentSession();

      if (app.cwd) {
        pane.write({ text: 'cd ' + app.cwd });
        pane.write({ text: 'clear' });
      }
      if (app.cmd) {
        pane.write({ text: app.cmd });
      }

      return window;
    },
  name: 'iTerm',
};

export const TextEdit = {
  type: 'app',
  params: ['file'],
  open: ({ file }) => file,
  name: 'TextEdit',
};

export const Atom = {
  type: 'app',
  params: ['file'],
    open: function open(app) {
      const Atom = Application('Atom');
      Atom.open(app.file);
      Atom.activate();
      return Atom.windows[0];
  },
  name: 'Atom',
};

export const Safari = {
  type: 'app',
  params: ['url'],
    open: function open(app) {
      const Safari = Application('Safari');

      if (Safari.running()) {
        Safari.Document().make();
      }

      Safari.activate();

      const window = Safari.windows[0];
      window.document.url = app.url;

      return window;
  },
  name: 'Safari',
};
