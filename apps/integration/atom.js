import fetch from 'node-fetch';

const domain = 'http://localhost';
const ports = [9110, 9111, 9112, 9113, 9114, 9115, 9116, 9117];

export async function open(split, folder, files) {
  const port = await findPort(folder);

  if (port) {
    const url = buildUrl(port, split, files);

    await fetch(url);
  }
}

function buildUrl(port, split, files) {
  const filesQuery = `file=${files.join('&file=')}`;

  return `${domain}:${port}/split=${split}&${filesQuery}`;
}

async function findPort(folder) {
  return Promise.resolve(9110);
}
