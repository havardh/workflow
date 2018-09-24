/**
 * given two trees, list the nodes from leaf to
 * head which contains a change. child nodes are
 * given in the children property
 */

const tree = {};

export function list(oldNode, newNode) {
  const changes = [];

  let oldN = oldNode.children.length;
  let newN = newNode.children.length;

  if (oldN > newN) {

  } else  if (oldN === newN) {

  } else { // oldN < newN

  }

  if (hasChanged(oldNode, newNode))) {
    changes.push(newNode);
  }

  return changes;
}
