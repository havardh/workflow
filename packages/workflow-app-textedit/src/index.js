/* global Application */
export const TextEdit = {
  type: 'app',
  name: 'Textedit',
  params: ['file'],
  open: async ({ file, position }, { platform, run }) => {
    if (platform !== 'osx') {
      throw new Error('Platform is not supported');
    }

    return run(
      (file, position) => {
        const Textedit = Application('TextEdit');

        Textedit.Document().make();

        Textedit.activate();

        const window = Textedit.windows[0];
        window.bounds = position;
      },
      file,
      position
    );
  },
};
