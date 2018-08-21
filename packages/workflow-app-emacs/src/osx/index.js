/* @flow */
/* global Application, delay */

import { convertToElisp } from '../common/convert';

function escape(string) {
  return string.replace(/\"/g, '\\"');
}

function createOpenCode(file, children) {
  if (file && children && children.length) {
    throw new Error('Emacs does not support both file and children');
  } else if (file && !children) {
    return `(find-file "${file}")`;
  } else {
    return convertToElisp(children);
  }
}

function jxaOpen({ x, y, width, height }, code) {
  const openCodeWhenRunning = `
      (progn
        (make-frame)
        (set-frame-position (selected-frame) ${x} ${y})
        (set-frame-size (selected-frame) ${width} ${height} t)
        ${code}
      )
    `
    .split('\n')
    .join(' ');

  const openCodeWhenNotRunning = `
      (progn
        (set-frame-position (selected-frame) ${x} ${y})
        (set-frame-size (selected-frame) ${width} ${height} t)
        ${code}
      )
    `
    .split('\n')
    .join(' ');

  const Emacs = Application('Emacs');
  if (Emacs.running()) {
    Emacs.activate();
    delay(0.05);

    execute(openCodeWhenRunning);
  } else {
    Emacs.activate();
    delay(0.4);

    execute(openCodeWhenNotRunning);
  }

  function execute(code) {
    const SE = Application('System Events');
    SE.keystroke(':', { using: 'option down' });
    SE.keystroke(code);
    SE.keyCode(36);
  }
}

export default async function open({ file, position }, { run }, children) {
  const code = createOpenCode(file, children);
  await run(jxaOpen, position, code);
}
