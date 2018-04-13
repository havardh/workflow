import React from "react";
import {App} from "workflow-react";

function open() {
  const iTerm = Application("iTerm");
  if (iTerm.running()) {
    const window = iTerm.createWindowWithDefaultProfile();
    window.select();
  }
  return iTerm.windows[0];
}

function run(window, app) {
  const pane = window.currentSession();

  function openSplit(pane, node) {

    if (node.horizontal && node.vertical) {
      if (node.first === 'horizontal') {
        openNode(pane.splitHorizontallyWithDefaultProfile(), node.horizontal);
        openNode(pane.splitVerticallyWithDefaultProfile(), node.vertical);
      } else {
        openNode(pane.splitVerticallyWithDefaultProfile(), node.vertical);
        openNode(pane.splitHorizontallyWithDefaultProfile(), node.horizontal);
      }
    } else if (node.horizontal) {
      openNode(pane.splitHorizontallyWithDefaultProfile(), node.horizontal);
    } else {
      openNode(pane.splitVerticallyWithDefaultProfile(), node.vertical);
    }
  }

  function openApp(pane, app) {
    if (app.cwd) {
        pane.write({text: "cd " + app.cwd})
        pane.write({text: "clear"})
      }
      if (app.cmd) {
        if (typeof app.cmd === "function") {
          console.log(app);
          pane.write({text: app.cmd()})
        } else {
          pane.write({text: app.cmd})
        }
      }
  }

  function openNode(pane, node) {
    if (node.vertical || node.horizontal) {
      openSplit(pane, node);
    }
    openApp(pane, node);
  }

  function convert(node) {
    if (node.layout) {
      const direction = node.layout;
      const root = convert(node.children[0]);

      let prev = root;
      for (let i=1; i<node.children.length; i++) {
        const current = convert(node.children[i]);
        prev[direction] = current;
        if (prev.horizontal && prev.vertical) {
          prev.first = direction;
        }
        prev = current;
      }
      if (root.horizontal && root.vertical) {
        root.first = direction;
      }
      return root;
    }
    return node;
  }

  if (app.children) {
    const root = convert(app.children[0])
    openNode(pane, root);
  } else {
    openApp(pane, app);
  }
}

const ITerm = ({children}) => (
  <App
    type={'app'}
    open={{open, run}}
    name={'iTerm'}
  >
    {children}
  </App>
);

export default ITerm;
