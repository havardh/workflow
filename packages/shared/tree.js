export function findAllApps(root) {
  const apps = [];

  let nodes = [root];
  while (nodes.length) {
    const node = nodes.shift();

    if (node.type === 'app') {
      apps.push(node);
    } else {
      if (node.children) {
        nodes.push(...node.children);
      } else if (node.root) {
        nodes.push(...node.root);
      }
    }
  }

  return apps;
}
