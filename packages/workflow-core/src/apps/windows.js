
export const Notepad = {
  open: ({ file }) => `notepad.exe ${file || ""}`,
};

export const IExplorer = {
  open: ({ url }) => `"C:\\Program Files\\Internet Explorer\\iexplore.exe" ${url}`,
};

export const PowerShell = {
  open: {
    program: "powershell.exe",
    start: true,
    args: []
  },
};
