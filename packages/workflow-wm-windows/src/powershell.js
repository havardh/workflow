import PowerShell from 'powershell';

export const exec = async cmd => {
  return new Promise((resolve, reject) => {
    const process = new PowerShell(cmd);

    process.on('error', reject);

    process.on('output', data => {
      const pid = data
        .split('\r\n')[3]
        .split(' ')
        .filter(ch => ch.length)[5];

      resolve(pid);
    });
  });
};
