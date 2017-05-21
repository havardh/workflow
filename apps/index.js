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
    return `cd ${cwd} && xterm -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
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
  | XTermConfig
  | ChromeConfig
  | NotepadConfig
  | IExplorerConfig;
