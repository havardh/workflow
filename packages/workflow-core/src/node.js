export function register(node, ...args) {
  for (let arg of args) {
    if (arg.register) {
      node = arg.register(node);
    }
  }

  return node;
}

export function unregister(node, ...args) {
  for (let arg of args) {
    if (arg.unregister) {
      arg.unregister(node);
    }
  }
}

export function update(instance, oldProps, newProps, ...args) {
  for (let arg of args) {
    if (arg.update) {
      arg.update(instance, oldProps, newProps);
    }
  }
}
