export async function apply(node, transformer, args, parent = undefined) {
  let transformed = (await transformer.transformBefore(node, { args, parent })) || node;

  let children = undefined;
  for (const child of node.children || []) {
    children = children || [];
    children.push(await apply(child, transformer, args, node));
  }

  let root = undefined;
  if (node.root) {
    root = await apply(node.root, transformer, args, node);
  }

  transformed = (await transformer.transformAfter(
    { ...transformed, children, root },
    { args, parent }
  )) || { ...transformed, children, root };

  return { ...transformed, children, root };
}

export async function transform(transforms, config, { args }) {
  let tree = config;

  for (let transformer of transforms) {
    tree = await apply(tree, transformer, args);
  }
  return tree;
}
