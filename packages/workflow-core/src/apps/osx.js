

export function Terminal(config) {
  return {
    open: () => "",
    ...config,
    jxa: {
      open: function open() {
        const system = Application('System Events');

        const app = Application("Terminal");
        const isRunning = app.running();

        app.activate();

        delay(0.1);

        if (isRunning) {
          system.keystroke('n', {using: 'command down'})
        }
        return app.windows[0];
      },

      run: function run(window, app) {
        if (app.cwd) {
          Application("Terminal").doScript("cd " + app.cwd, {in: window})
          Application("Terminal").doScript("clear", {in: window})
        }
        if (app.cmd) {
          Application("Terminal").doScript(app.cmd, {in: window})
        }
      }
    },
    name: 'Terminal',
  };
}

export function iTerm2(config) {
  return {
    open: () => "",
    ...config,
    jxa: {
      open: function open() {
        const iTerm = Application("iTerm")

        if (iTerm.running()) {
          const window = iTerm.createWindowWithDefaultProfile();
          window.select();
        }

        return iTerm.windows[0];
      },

      run: function run(window, app) {
        const iTerm = Application("iTerm")

        const pane = window.currentSession();

        if (app.cwd) {
          pane.write({text: "cd " + app.cwd})
          pane.write({text: "clear"})
        }
        if (app.cmd) {
          pane.write({text: app.cmd})
        }
      }
    },
    name: 'iTerm',
  };
}

export function TextEdit(config) {
  return {
    open: ({ file }) => file,
    ...config,
    name: 'TextEdit',
  };
}

export function Atom(config) {
  return {
    open: ({ file }) => file,
    ...config,
    jxa: {
      open: function open(app) {
        const Atom = Application("Atom")
        Atom.open(app.file);
        return Atom.windows[0];
      },
      run: function run() {}
    },
    name: 'Atom',
  };
}

export function Safari(config) {
  return {
    open: ({ url }) => url,
    ...config,
    jxa: {
      open: function open() {
         const app = Application("Safari");

         if (app.running()) {
           app.Document().make();
         }

         app.activate();

         return app.windows[0];
      },

      run: function run(window, app) {
        window.document.url = app.url;
      }
    },
    name: 'Safari',
  };
}
