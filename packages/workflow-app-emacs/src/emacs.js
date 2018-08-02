/* @flow */
import * as React from 'react';
import { file } from 'tmp-promise';
import { outputFile, close } from 'fs-extra';

import { App } from 'workflow-react';

async function open({ sessionName, children }) {
  const tree = convert(children[0]);

  const instructions = serialize(tree);

  const { path, fd } = await file({
    prefix: 'workflow-app-emacs-',
    postfix: '.el',
  });

  await outputFile(path, instructions.join('\n'));
  await close(fd);

  return `emacs -nw -l ${path}`;
}

function convert(node) {
  if (node.layout) {
    const direction = node.layout;
    const root = convert(node.children[0]);

    let prev = root;
    for (let i = 1; i < node.children.length; i++) {
      const current = convert(node.children[i]);
      prev[direction] = current;
      if (prev.splitv && prev.splith) {
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

function serialize(node) {
  const serialized = [];

  serialized.push(...serializeApp(node));
  if (node.splitv || node.splith) {
    serialized.push(...serializeSplit(node));
  }

  return serialized;
}

function countid() {
  countid.id = countid.id || 0;

  return countid.id++;
}

function serializeSplit(node) {
  const serialized = [];

  if (node.splitv && node.splith) {
    serialized.push('(save-selected-window');
    if (node.first === 'splitv') {
      serialized.push(`(split-window-right)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splitv));
      serialized.push(')');
      serialized.push(`(split-window-below)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splith));
    } else {
      serialized.push(`(split-window-below)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splith));
      serialized.push(')');
      serialized.push(`(split-window-right)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splitv));
    }
  } else if (node.splith) {
    serialized.push(`(split-window-below)`);
    serialized.push(...serialize(node.splitv));
  } else {
    serialized.push(`(split-window-right)`);
    serialized.push(`(other-window 1)`);
    serialized.push(...serialize(node.splith));
  }

  return serialized;
}

function serializeApp(node) {
  return [node.open(node)];
}

const Emacs = ({ sessionName, children }: { sessionName: string, children: React.Node }) => (
  <App type={'app'} open={open} name={'emacs'}>
    {children}
  </App>
);

export default Emacs;
