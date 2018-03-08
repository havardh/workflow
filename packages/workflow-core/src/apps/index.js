// @flow
export type TerminalConfig = {
  percent: number,
  class?: string,
  cwd?: string | (any) => string,
  cmd?: string | (any) => string,
  args?: Array<string | (any) => string>,
  open?: (any) => string,
}

export type TextEditorConfig = {
  percent: number,
  class?: string,
  open?: (any) => string,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export type BrowserConfig = {
  percent: number,
  class?: string,
  url: string | (any) => string,
  open?: (any) => string
}

export type AppConfig =
    TerminalConfig
  | TextEditorConfig
  | BrowserConfig;
