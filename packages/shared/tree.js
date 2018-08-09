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
      }
    }
  }

  return apps;
}

export async function openApps(node, context) {
  return {
    ...node,
    open: node.open && (await node.open(node, context, node.children)),
    children:
      node.children &&
      (await Promise.all(node.children.map(async child => await openApps(child, context)))),
  };
}
