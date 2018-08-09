const PowerShell = {
  type: "app",
  name: "PowerShell",
  params: ["cwd", "cmd"],
  open: async (
    { cwd, cmd, position },
    { platform, startOnPositionByReturnedPid },
    children
  ) => {
    if (platform !== "win32") {
      throw new Error("Unsupported platform " + platform);
    }

    await startOnPositionByReturnedPid({
      cmd: "PowerShell.exe",
      args: ["-NoExit", "-Command", cmd],
      position
    });
  }
};

export default PowerShell;
