/* @flow */
import * as React from 'react';

import { App } from 'workflow-react';

function open({ sessionName, children }) {
  const tree = convert(children[0]);

  const instructions = serialize(tree);

  const script = `#!/bin/bash
tmux kill-session -t ${sessionName}
tmux start-server
tmux new-window -a -n ${sessionName}
tmux new-session -d -s ${sessionName}
${instructions.join('\n')}
echo
echo ' Attach with: tmux attach-session -t ${sessionName}'
`;

  return script;
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

  const PANE_VARIABLE = 'WF_TMUX_PANE_' + countid();

  if (node.splitv && node.splith) {
    serialized.push(
      `${PANE_VARIABLE}=\`tmux lsp | grep active | awk '{print $1}' | grep -o '[0-9]*'\``
    );
    if (node.first === 'splitv') {
      serialized.push(`tmux splitw -v`);
      serialized.push(...serialize(node.splitv));
      serialized.push(`tmux selectp -t $${PANE_VARIABLE}`);
      serialized.push(`tmux splitw -h`);
      serialized.push(...serialize(node.splith));
    } else {
      serialized.push(`tmux splitw -h`);
      serialized.push(...serialize(node.splith));
      serialized.push(`tmux selectp -t $${PANE_VARIABLE}`);
      serialized.push(`tmux splitw -v`);
      serialized.push(...serialize(node.splitv));
    }
  } else if (node.splitv) {
    serialized.push(`tmux splitw -v`);
    serialized.push(...serialize(node.splitv));
  } else {
    serialized.push(`tmux splitw -h`);
    serialized.push(...serialize(node.splith));
  }

  return serialized;
}

function serializeApp(node) {
  return [`tmux send-keys "${node.open}" C-m`];
}

const Tmux = ({ sessionName, children }: { sessionName: string, children: React.Node }) => (
  <App type={'app'} open={open} name={'tmux'} sessionName={sessionName}>
    {children}
  </App>
);

export default Tmux;
