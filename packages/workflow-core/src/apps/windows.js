
export const Notepad = {
  params: ["file"],
  open: ({ file }) => `notepad.exe ${file || ""}`,
};

export const IExplorer = {
  params: ["url"],
  open: ({ url }) => `"C:\\Program Files\\Internet Explorer\\iexplore.exe" ${url}`,
};

export const PowerShell = {
  params: ["file"],
  open: {
    program: "powershell.exe",
    start: true,
    args: []
  },
};
