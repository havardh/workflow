export const Atom = {
  open: ({ file }) => `atom -n ${file}`,
  class: 'Atom',
};

export const Code = {
  open: ({ file }) => `code -n ${file}`,
  class: 'Code',
};

export const Emacs = {
  open: ({ file }) => `emacs ${file}`,
  class: 'Emacs',
};

export const XTerm = {
  open: ({ cwd, cmd, args }) => {
    const argsString = (args || []).join(' ');

    if (cmd) {
      return `cd ${cwd} && xterm -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
    }
    return `cd ${cwd} && xterm -ls -T '${cmd} ${argsString}' -hold`;
  },
  class: 'XTerm'
};

export const Chrome = {
  open: ({ url }) => `google-chrome-stable --new-window ${url}`,
  class: 'Google-chrome',
};

export const Chromium = {
  open: ({ url }) => `chromium-browser --new-window ${url}`,
  class: 'Chromium',
};

export const Firefox = {
  open: ({ url }) => `firefox ${url}`,
  class: 'Navigator.Firefox',
};

export const Gedit = {
  open: ({ file }) => `gedit --new-window ${file}`,
  class: 'gedit.Gedit',
};
