export async function apply(node, transformer, args, parent = undefined) {
  let transformed = node;

  if (typeof transformer.transformBefore === 'function') {
    transformed = (await transformer.transformBefore(node, { args, parent })) || node;
  }

  let children = undefined;
  for (const child of node.children || []) {
    children = children || [];
    children.push(await apply(child, transformer, args, node));
  }

  if (typeof transformer.transformAfter === 'function') {
    transformed = (await transformer.transformAfter(
      { ...transformed, children },
      { args, parent }
    )) || { ...transformed, children };
  }

  return { ...transformed, children };
}

export async function transform(transforms, config, { args }) {
  let tree = config;

  for (let transformer of transforms) {
    tree = await apply(tree, transformer, args);
  }
  return tree;
}
