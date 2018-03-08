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

export type PowerShellConfig = {
  percent: number,
  cwd: string | (any) => string,
  cmd: string | (any) => string
};

export function PowerShell(config: PowerShellConfig): PowerShell {
  return {
    ...config,
    open: () => 'start powershell',
  };
}
