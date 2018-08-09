import { convert } from "shared/layout";

export function convertToElisp(children) {
  const tree = convert(children[0]);

  const instructions = "(progn " + serialize(tree).join(" ") + ")";

  return instructions;
}

function serialize(node) {
  const serialized = [];

  serialized.push(...serializeApp(node));
  if (node.splitv || node.splith) {
    serialized.push(...serializeSplit(node));
  }

  return serialized;
}

function serializeSplit(node) {
  const serialized = [];

  if (node.splitv && node.splith) {
    serialized.push('(save-selected-window');
    if (node.first === 'splitv') {
      serialized.push(`(split-window-right)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splitv));
      serialized.push(')');
      serialized.push(`(split-window-below)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splith));
    } else {
      serialized.push(`(split-window-below)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splith));
      serialized.push(')');
      serialized.push(`(split-window-right)`);
      serialized.push(`(other-window 1)`);
      serialized.push(...serialize(node.splitv));
    }
  } else if (node.splitv) {
    serialized.push(`(split-window-below)`);
    serialized.push(...serialize(node.splitv));
  } else {
    serialized.push(`(split-window-right)`);
    serialized.push(`(other-window 1)`);
    serialized.push(...serialize(node.splith));
  }

  return serialized;
}

function serializeApp(node) {
  return [node.open(node)];
}
