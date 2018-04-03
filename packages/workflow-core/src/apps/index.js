// @flow
import * as defaults from "./defaults";
import * as linux from "./linux";
import * as osx from "./osx";
import * as windows from "./windows";

export type TerminalConfig = {
  percent: number,
  class?: string,
  cwd?: string | (any) => string,
  cmd?: string | (any) => string,
  args?: Array<string | (any) => string>,
  jxa: any,
  open?: (any) => string | string,
}

export type TextEditorConfig = {
  percent: number,
  class?: string,
  open?: (any) => string | string,
  jxa: any,
  folder?: string | (any) => string,
  file?: string | (any) => string,
};

export type BrowserConfig = {
  percent: number,
  class?: string,
  jxa: any,
  url: string | (any) => string,
  open?: (any) => string | string
}

export type AppConfig =
    TerminalConfig
  | TextEditorConfig
  | BrowserConfig;

export default { defaults, linux, osx, windows };
