/* global Application, delay */
import { convert } from 'shared/layout';
import { openApps } from 'shared/tree';

const ITerm = {
  type: 'app',
  name: 'iTerm2',
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
      root = {};
    }

    run(
      function(root, position) {
        delay(1);
        const window = newWindow();
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
              openNode(pane.splitHorizontallyWithDefaultProfile(), node.splith);
              openNode(pane.splitVerticallyWithDefaultProfile(), node.splitv);
            } else {
              openNode(pane.splitVerticallyWithDefaultProfile(), node.splitv);
              openNode(pane.splitHorizontallyWithDefaultProfile(), node.splith);
            }
          } else if (node.splith) {
            openNode(pane.splitHorizontallyWithDefaultProfile(), node.splith);
          } else {
            openNode(pane.splitVerticallyWithDefaultProfile(), node.splitv);
          }
        }

        function openApp(pane, app) {
          if (app.open) {
            pane.write({ text: app.open });
          }
        }
      },
      root,
      position
    );
  },
};

export default ITerm;
