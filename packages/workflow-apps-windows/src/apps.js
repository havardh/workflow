export const Notepad = {
  type: "app",
  params: ["file"],
  name: "Notepad",
  open: ({ file }) => `notepad.exe ${file || ""}`,
};

export const IExplorer = {
  type: "app",
  params: ["url"],
  name: "IExplorer",
  open: ({ url }) => `"C:\\Program Files\\Internet Explorer\\iexplore.exe" ${url}`,
};

export const PowerShell = {
  type: "app",
  params: ["file"],
  name: "PowerShell",
  open: {
    program: "powershell.exe",
    start: true,
    args: []
  },
};
