export function findAllApps(root) {
  const apps = [];

  let nodes = [root];
  while (nodes.length) {
    const node = nodes.shift();

    if (node.type === "app") {
      apps.push(node);
    } else {
      nodes.push(...node.children);
    }
  }

  return apps;
}
