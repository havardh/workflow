/* @flow */
/* global Application */
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
    } else {
      const openedTree = await openApps(children[0], { platform: 'osx', wm: 'terminal' });
      root = convert(openedTree);
    }

    run(
      (root, position) => {
        const window = newWindow();
        window.bounds = position;
        const pane = window.currentSession();
        openNode(pane, root);

        function newWindow() {
          const iTerm = Application('iTerm');
          if (iTerm.running()) {
            const window = iTerm.createWindowWithDefaultProfile();
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
          pane.write({ text: app.open });
        }
      },
      root,
      position
    );
  },
};

export default ITerm;
