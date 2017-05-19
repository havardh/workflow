// @flow
export type AtomConfig = {
  percent: number,
  class?: string,
  open?: (any) => string,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export type XTermConfig = {
  percent: number,
  class?: string,
  cwd?: string | (any) => string,
  cmd?: string | (any) => string,
  args?: Array<string | (any) => string>,
  open?: (any) => string,
};

export type ChromeConfig = {
  percent: number,
  class?: string,
  url: string | (any) => string,
  open?: (any) => string
}

export type AppConfig = AtomConfig | XTermConfig | ChromeConfig;

export function Atom(config: AtomConfig): AtomConfig {
  return {
    open: ({ file }) => `atom -n ${file}`,
    ...config,
    class: 'Atom',
  };
}

export function XTerm(config: XTermConfig): XTermConfig {
  function open({ cwd, cmd, args }) {
    const argsString = (args || []).join(' ');
    return `cd ${cwd} && xterm -T '${cmd} ${argsString}' -e '${cmd} ${argsString}'`;
  }

  return { open, ...config, class: 'XTerm' };
}

export function Chrome(config: ChromeConfig): ChromeConfig {
  return {
    open: ({ url }) => `google-chrome-stable --new-window ${url}`,
    ...config,
    class: 'Google-chrome',
  };
}
