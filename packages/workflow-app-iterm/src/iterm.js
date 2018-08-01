/* @flow */
/* global Application */
import * as React from 'react';
import { App } from 'workflow-react';

function open(app) {
  // $FlowTodo
  const iTerm = Application('iTerm');
  if (iTerm.running()) {
    const window = iTerm.createWindowWithDefaultProfile();
    window.select();
  }

  const window = iTerm.windows[0];

  const pane = window.currentSession();

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

  function openNode(pane, node) {
    if (node.splitv || node.splith) {
      openSplit(pane, node);
    }
    openApp(pane, node);
  }

  function convert(node) {
    if (node.layout) {
      const direction = node.layout;
      const root = convert(node.children[0]);

      let prev = root;
      for (let i = 1; i < node.children.length; i++) {
        const current = convert(node.children[i]);
        prev[direction] = current;
        if (prev.splith && prev.splitv) {
          prev.first = direction;
        }
        prev = current;
      }
      if (root.splith && root.splitv) {
        root.first = direction;
      }
      return root;
    }
    return node;
  }

  if (app.children) {
    const root = convert(app.children[0]);
    openNode(pane, root);
  } else {
    openApp(pane, app);
  }

  return window;
}

const ITerm = ({ children }: { children: React.Node }) => (
  <App type={'app'} open={open} name={'iTerm'}>
    {children}
  </App>
);

export default ITerm;
