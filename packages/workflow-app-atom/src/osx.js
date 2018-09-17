/* eslint-env node */
/* global Application */
import execa from 'execa';

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

export async function open({ file, position }, context) {
  const { run } = context;

  await execa('atom', ['-n', file]);

  await timeout(2000);

  return run(position => {
    const Atom = Application('Atom');

    Atom.activate();
    Atom.windows[0].bounds = position;
  }, position);
}
