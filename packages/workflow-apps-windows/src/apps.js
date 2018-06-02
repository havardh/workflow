export const Notepad = {
  type: "app",
  params: ["file"],
  name: "Notepad",
  open: {
    fn: ({ file }) => `notepad.exe ${file || ""}`
  },
};

export const Edge = {
  type: "app",
  params: ["url"],
  name: "Edge",
  open: {
    fn: ({ url }) => `microsoft-edge:${url}`,
    processName: "MicrosoftEdgeCP.exe",
    start: true
  },
};

export const PowerShell = {
  type: "app",
  params: ["file"],
  name: "PowerShell",
  open: {
    fn: () => "powershell.exe",
    start: true
  },
};
