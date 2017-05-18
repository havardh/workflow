// @flow
export type AtomConfig = {
  percent: number,
  class?: string,
  open: string | (any) => string,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export type XTermConfig = {
  percent: number,
  class?: string,
  cwd?: string | (any) => string,
  cmd?: string | (any) => string,
  args?: Array<string | (any) => string>,
  open: string | (any) => string,
};

export type ChromeConfig = {
    percent: number,
    class?: string,
    url: string | (any) => string,
    open: string | (any) => string
}

export type AppConfig = AtomConfig | XTermConfig | ChromeConfig;

export function Atom(config: AtomConfig): AtomConfig {
  return { ...config, class: 'Atom' };
}

export function XTerm(config: XTermConfig): XTermConfig {
  return { ...config, class: 'XTerm' };
}

export function Chrome(config: ChromeConfig): ChromeConfig {
  return { ...config, class: 'Google-chrome' };
}
