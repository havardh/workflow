const safari = {
  type: 'app',
  name: 'Safari',
  params: ['url'],
  open: async ({ url, position }, { platform, run }, children) => {
    if (platform !== 'osx') {
      throw new Error('Platform is not supported');
    }

    return run(
      (url, position) => {
        const Safari = Application('Safari');

        if (Safari.running()) {
          Safari.Document().make();
        }

        Safari.activate();

        const window = Safari.windows[0];
        window.document.url = url;
        window.bounds = position;
      },
      url,
      position
    );
  },
};

export default safari;
