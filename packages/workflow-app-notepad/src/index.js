const Notepad = {
  type: 'app',
  name: 'Notepad',
  params: ['file'],
  open: async ({ file, position }, { platform, startOnPositionByReturnedPid }, children) => {
    if (platform !== 'win32') {
      throw new Error('Unsupported platform ' + platform);
    }

    await startOnPositionByReturnedPid({
      cmd: 'notepad.exe',
      args: [file],
      position,
    });
  },
};

export default Notepad;
