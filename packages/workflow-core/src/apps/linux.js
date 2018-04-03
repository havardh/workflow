export const Atom = {
  params: ["file"],
  open: ({ file }) => `atom -n ${file}`,
  xClass: 'Atom',
};

export const Code = {
  params: ["file"],
  open: ({ file }) => `code -n ${file}`,
  xClass: 'Code',
};

export const Emacs = {
  params: ["file"],
  open: ({ file }) => `emacs ${file}`,
  xClass: 'Emacs',
};

export const XTerm = {
  params: ["cwd", "cmd", "args"],
  open: ({ cwd, cmd, args }) => {
    const argsString = (args || []).join(' ');

    if (cmd) {
      return `cd ${cwd} && xterm -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
    }
    return `cd ${cwd} && xterm -ls -T '${cmd} ${argsString}' -hold`;
  },
  xClass: 'XTerm'
};

export const Chrome = {
  params: ["url"],
  open: ({ url }) => `google-chrome-stable --new-window ${url}`,
  xClass: 'Google-chrome',
};

export const Chromium = {
  params: ["url"],
  open: ({ url }) => `chromium-browser --new-window ${url}`,
  xClass: 'Chromium',
};

export const Firefox = {
  params: ["url"],
  open: ({ url }) => `firefox ${url}`,
  class: 'Navigator.Firefox',
};

export const Gedit = {
  params: ["file"],
  open: ({ file }) => `gedit --new-window ${file}`,
  xClass: 'gedit.Gedit',
};
