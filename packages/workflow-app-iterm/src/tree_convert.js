/*

*/
export default function convert(node) {
  if (node.layout) {
    const direction = node.layout;
    const root = convert(node.children[0]);

    let prev = root;
    for (let i = 1; i < node.children.length; i++) {
      const current = convert(node.children[i]);
      prev[direction] = current;
      if (prev.splith && prev.splitv) {
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
