export function register(node, ...args) {
  const children = [];

  for (let child of node.children || []) {
    children.push(register(child, ...args));
  }

  for (let arg of args) {
    if (arg.register) {
      node = arg.register({ ...node, children });
    }
  }

  return node;
}

export function unregister(...args) {
  for (let arg of args) {
    if (arg.unregister) {
      arg.unregister();
    }
  }
}

export function update(node, ...args) {
  for (let child of node.children || []) {
    update(child, ...args);
  }

  for (let arg of args) {
    if (arg.update) {
      arg.update(node);
    }
  }
}
