// @flow
export type AtomConfig = {
  percent: number,
  class?: string,
  open?: (any) => string,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export function Atom(config: AtomConfig): AtomConfig {
  return {
    open: ({ file }) => `atom -n ${file}`,
    ...config,
    class: 'Atom',
  };
}
export type CodeConfig = {
  percent: number,
  class?: string,
  open?: (any) => string,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export function Code(config: AtomConfig): AtomConfig {
  return {
    open: ({ file }) => `code -n ${file}`,
    ...config,
    class: 'Code',
  };
}

export function Emacs(config: AtomConfig): AtomConfig {
  return {
    open: ({ file }) => `emacs ${file}`,
    ...config,
    class: 'Emacs',
  };
}

export type XTermConfig = {
  percent: number,
  class?: string,
  cwd?: string | (any) => string,
  cmd?: string | (any) => string,
  args?: Array<string | (any) => string>,
  open?: (any) => string,
};

export function XTerm(config: XTermConfig): XTermConfig {
  function open({ cwd, cmd, args }) {
    const argsString = (args || []).join(' ');

    if (cmd) {
      return `cd ${cwd} && xterm -T '${cmd} ${argsString}' -c '${cmd} ${argsString}'`;
    }
    return `cd ${cwd} && xterm -ls -T '${cmd} ${argsString}' -hold`;
  }

  return { open, ...config, class: 'XTerm' };
}

export type ChromeConfig = {
  percent: number,
  class?: string,
  url: string | (any) => string,
  open?: (any) => string
}

export function Chrome(config: ChromeConfig): ChromeConfig {
  return {
    open: ({ url }) => `google-chrome-stable --new-window ${url}`,
    ...config,
    class: 'Google-chrome',
  };
}

export type ChromiumConfig = {
  percent: number,
  class?: string,
  url: string | (any) => string,
  open?: (any) => string
}

export function Chromium(config: ChromiumConfig): ChromiumConfig {
  return {
    open: ({ url }) => `chromium-browser --new-window ${url}`,
    ...config,
    class: 'Chromium',
  };
}

export type FirefoxConfig = {
  percent: number,
  class?: string,
  url: string | (any) => string,
  open?: (any) => string
}

export function Firefox(config: FirefoxConfig): FirefoxConfig {
  return {
    open: ({ url }) => `firefox ${url}`,
    ...config,
    class: 'Navigator.Firefox',
  };
}

export type GeditConfig = {
  percent: number,
  class?: string,
  url: string | (any) => string,
  open?: (any) => string
}

export function Gedit(config: GeditConfig): GeditConfig {
  return {
    open: ({ file }) => `gedit --new-window ${file}`,
    ...config,
    class: 'gedit.Gedit',
  };
}


export type NotepadConfig = {
  percent: number,
  file?: (any) => string,
  class?: string,
  open?: (any) => string
}

export function Notepad(config: NotepadConfig): NotepadConfig {
  return {
    file: ({ file }) => file,
    ...config,
    open: ({ file }) => `notepad.exe ${file}`,
  };
}

export type IExplorerConfig = {
  percent: number,
  url: string,
  open?: (any) => string,
}

export function IExplorer(config: IExplorerConfig): IExplorerConfig {
  return {
    ...config,
    open: ({ url }) => `"C:\\Program Files\\Internet Explorer\\iexplore.exe" ${url}`,
  };
}

export type AppConfig =
    AtomConfig
  | CodeConfig
  | XTermConfig
  | ChromeConfig
  | NotepadConfig
  | IExplorerConfig;
