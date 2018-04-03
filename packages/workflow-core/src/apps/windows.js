
export const Notepad = {
  params: ["file"],
  name: "Notepad",
  open: ({ file }) => `notepad.exe ${file || ""}`,
};

export const IExplorer = {
  params: ["url"],
  name: "IExplorer",
  open: ({ url }) => `"C:\\Program Files\\Internet Explorer\\iexplore.exe" ${url}`,
};

export const PowerShell = {
  params: ["file"],
  name: "PowerShell",
  open: {
    program: "powershell.exe",
    start: true,
    args: []
  },
};
