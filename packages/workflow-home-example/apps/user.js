// Read more about defining apps here: ...

export const apps = {
  Brave: {
    params: ['url'],
    class: 'brave', // x11 window class for emacs
    open: ({ url }) => `brave -- --new-window ${url}`,
  },
};
