/* global Application, delay */
import { convert } from 'shared/layout';
import { openApps } from 'shared/tree';

export const ITerm = {
  type: 'app',
  name: 'iTerm2',
  connected: false,

  open: async ({ cwd, cmd, position }, { platform, run }, children) => {
    if (platform !== 'osx') {
      throw new Error('Unsupported platform');
    }

    let root;
    if (cmd) {
      root = { open: `cd ${cwd}; clear; ${cmd}` };
    } else if (children && children.length) {
      const openedTree = await openApps(children[0], {
        platform: 'osx',
        wm: 'terminal',
      });
      root = convert(openedTree);
    } else {
      root = { open: `cd ${cwd}; clear` };
    }

    const windowId = await run(
      function(root, position) {
        delay(1);
        const window = newWindow();
        const windowId = window.id();
        window.bounds = position;
        const pane = window.currentSession();
        openNode(pane, root);

        function newWindow() {
          const iTerm = Application('iTerm');
          delay(1);
          if (iTerm.running()) {
            const window = iTerm.createWindowWithDefaultProfile();
            delay(1);
            window.select();
          }

          return iTerm.windows[0];
        }

        function openNode(pane, node) {
          if (node.splitv || node.splith) {
            openSplit(pane, node);
          }
          openApp(pane, node);
        }

        function openSplit(pane, node) {
          if (node.splith && node.splitv) {
            if (node.first === 'splith') {
              openNode(pane.splitVerticallyWithDefaultProfile(), node.splith);
              openNode(pane.splitHorizontallyWithDefaultProfile(), node.splitv);
            } else {
              openNode(pane.splitHorizontallyWithDefaultProfile(), node.splitv);
              openNode(pane.splitVerticallyWithDefaultProfile(), node.splith);
            }
          } else if (node.splith) {
            openNode(pane.splitVerticallyWithDefaultProfile(), node.splith);
          } else {
            openNode(pane.splitHorizontallyWithDefaultProfile(), node.splitv);
          }
        }

        function openApp(pane, app) {
          if (app.open) {
            pane.write({ text: app.open });
          }
        }

        return windowId;
      },
      root,
      position
    );

    return { windowId };
  },

  update: async ({ cwd, cmd, position, windowId }, { platform, run }, children) => {
    let root;
    if (cmd) {
      root = { open: `cd ${cwd}; clear; ${cmd}` };
    } else if (children && children.length) {
      const openedTree = await openApps(children[0], {
        platform: 'osx',
        wm: 'terminal',
      });
      root = convert(openedTree);
    } else {
      root = { open: `cd ${cwd}; clear` };
    }

    await run(
      function(root, position, windowId) {
        const window = Application('iTerm').windows.byId(windowId);
        window.bounds = position;

        clearWindow(window);

        const pane = window.currentSession();

        openNode(pane, root);

        function clearWindow(window) {
          for (let i = 1; i < window.tabs[0].sessions.length; i++) {
            window.tabs[0].sessions[i].close();
          }
          window.currentSession().write({ text: 'clear' });
        }

        function openNode(pane, node) {
          if (node.splitv || node.splith) {
            openSplit(pane, node);
          }
          openApp(pane, node);
        }

        function openSplit(pane, node) {
          if (node.splith && node.splitv) {
            if (node.first === 'splith') {
              openNode(pane.splitVerticallyWithDefaultProfile(), node.splith);
              openNode(pane.splitHorizontallyWithDefaultProfile(), node.splitv);
            } else {
              openNode(pane.splitHorizontallyWithDefaultProfile(), node.splitv);
              openNode(pane.splitVerticallyWithDefaultProfile(), node.splith);
            }
          } else if (node.splith) {
            openNode(pane.splitVerticallyWithDefaultProfile(), node.splith);
          } else {
            openNode(pane.splitHorizontallyWithDefaultProfile(), node.splitv);
          }
        }

        function openApp(pane, app) {
          if (app.open) {
            pane.write({ text: app.open });
          }
        }
      },
      root,
      position,
      windowId
    );
  },
};
