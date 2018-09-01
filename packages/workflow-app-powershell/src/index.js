const PowerShell = {
  type: 'app',
  name: 'PowerShell',
  params: ['cwd', 'cmd'],
  open: async ({ cmd, position }, { platform, startOnPositionByReturnedPid }) => {
    if (platform !== 'win32') {
      throw new Error('Unsupported platform ' + platform);
    }

    let args = [];
    if (cmd) {
      args = ['-NoExit', '-Command', cmd];
    } else {
      args = ['-NoExit'];
    }

    await startOnPositionByReturnedPid({
      cmd: 'PowerShell.exe',
      args,
      position,
    });
  },
};

export default PowerShell;
