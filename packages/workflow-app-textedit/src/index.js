/* global Application */
const safari = {
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

        if (Textedit.running()) {
          Textedit.Document().make();
        }

        Textedit.activate();

        const window = Textedit.windows[0];
        window.bounds = position;
      },
      file,
      position
    );
  },
};

export default safari;
