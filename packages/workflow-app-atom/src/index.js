import { platform } from 'shared/apps';
import execa from 'execa';

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

export const Atom = {
  type: 'app',
  name: 'Atom',
  xClass: 'Atom',

  open: platform({
    'osx-default': osxOpen,
    'linux-*': linuxOpen,
  }),

  async update({ file, position, windowId }, { send, run }) {
    await run(
      (position, windowId) => {
        const Atom = Application('Atom');
        const window = Atom.windows.byId(windowId);
        window.bounds = position;

        return window.id();
      },
      position,
      windowId
    );

    if (send) {
      await send({ topic: 'workflow.apply', message: { file } });
    }
  },
};

async function linuxOpen({ file, appId }) {
  return `WORKFLOW_APP_INSTANCE_ID=${appId} atom -dn ${file}`;
}

async function linuxUpdate({ file }, { send }) {
  send({ topic: 'workflow.apply', message: { file } });
}

async function osxOpen({ file, appId, position }, { run }) {
  console.log('atom', position);
  await execa('atom', ['-dn', file], { env: { WORKFLOW_APP_INSTANCE_ID: appId } });
  await timeout(2000);

  const windowId = await run(position => {
    const Atom = Application('Atom');
    Atom.activate();

    const window = Atom.windows[0];
    window.bounds = position;

    let id = 0;
    while (id <= 0) {
      id = window.id();
    }

    return id;
  }, position);

  console.log('Atom', windowId);

  return { windowId };
}

async function osxUpdate({ file, windowId, position }, { send, run }) {
  await run(
    (windowId, position) => {
      const Atom = Application('Atom');
      const window = Atom.windows.byId(windowId);
      window.bounds = position;
    },
    windowId,
    position
  );

  await send({ topic: 'workflow.apply', message: { file } });
}
