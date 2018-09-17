async function open({ sessionName }, context, children) {
  const tree = convert(children[0]);

  const instructions = await serialize(tree, context);

  const script = `#!/bin/bash
tmux kill-session -t ${sessionName}
tmux start-server
tmux new-window -a -n ${sessionName}
tmux new-session -d -s ${sessionName}
${instructions.join('\n')}
tmux attach-session -t ${sessionName}
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

async function serialize(node, context) {
  const serialized = [];

  serialized.push(...(await serializeApp(node, context)));
  if (node.splitv || node.splith) {
    serialized.push(...(await serializeSplit(node, context)));
  }

  return serialized;
}

function countid() {
  countid.id = countid.id || 0;

  return countid.id++;
}

async function serializeSplit(node, context) {
  const serialized = [];

  const PANE_VARIABLE = 'WF_TMUX_PANE_' + countid();

  if (node.splitv && node.splith) {
    serialized.push(
      `${PANE_VARIABLE}=\`tmux lsp | grep active | awk '{print $1}' | grep -o '[0-9]*'\``
    );
    if (node.first === 'splitv') {
      serialized.push(`tmux splitw -v`);
      serialized.push(...(await serialize(node.splitv, context)));
      serialized.push(`tmux selectp -t $${PANE_VARIABLE}`);
      serialized.push(`tmux splitw -h`);
      serialized.push(...(await serialize(node.splith, context)));
    } else {
      serialized.push(`tmux splitw -h`);
      serialized.push(...(await serialize(node.splith, context)));
      serialized.push(`tmux selectp -t $${PANE_VARIABLE}`);
      serialized.push(`tmux splitw -v`);
      serialized.push(...(await serialize(node.splitv, context)));
    }
  } else if (node.splitv) {
    serialized.push(`tmux splitw -v`);
    serialized.push(...(await serialize(node.splitv, context)));
  } else {
    serialized.push(`tmux splitw -h`);
    serialized.push(...(await serialize(node.splith, context)));
  }

  return serialized;
}

async function serializeApp(node, context) {
  return [`tmux send-keys "${await node.open(node, context, node.children)}" C-m`];
}

export const Tmux = {
  type: 'app',
  name: 'tmux',
  params: ['sessionName'],
  open,
};
