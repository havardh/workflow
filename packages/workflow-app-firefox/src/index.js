/* eslint-disable no-unused-vars */
export const Firefox = {
  type: 'app',
  name: 'Firefox',
  params: ['url'],
  open: async ({ url, position }, context, children) => {
    const { run } = context;

    await run({
      cmd: 'firefox',
      args: ['--new-window', url],
      position,
      className: 'Navigator.Firefox',
    });
  },
};
