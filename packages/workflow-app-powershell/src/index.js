const PowerShell = {
  type: 'app',
  name: 'PowerShell',
  params: ['cwd', 'cmd'],
  open: async ({ cmd, position }, { platform, startOnPositionByReturnedPid }) => {
    if (platform !== 'win32') {
      throw new Error('Unsupported platform ' + platform);
    }

    await startOnPositionByReturnedPid({
      cmd: 'PowerShell.exe',
      args: ['-NoExit', '-Command', cmd],
      position,
    });
  },
};

export default PowerShell;
