import { convertToElisp } from './convert';

function escape(string) {
  return string.replace(/"/g, '\\"');
}

async function open({ file, flags }, context, children) {
  if (file && children && children.length) {
    throw new Error('Emacs does not support both file and children');
  } else if (file && !children) {
    return `emacs ${flags} ${file}`;
  } else {
    const elisp = convertToElisp(children);
    return `emacs ${flags} --execute "${escape(elisp)}"`;
  }
}

export default open;
