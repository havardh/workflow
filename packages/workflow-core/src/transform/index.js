export default async function transform(node, transformer, args, parent = undefined) {

  let transformed = (await transformer.transformBefore(node, {args, parent})) || node;

  let children = undefined;
  for (const child of (node.children || [])) {
    children = children || [];
    children.push(await transform(child, transformer, args, node));
  }

  let root = undefined;
  if (node.root) {
    root = await transform(node.root, transformer, args, node);
  }

  transformed = (await transformer.transformAfter({...transformed, children, root}, {args, parent})) || { ...transformed, children, root};

  return {...transformed, children, root};
}
