import { readFile } from 'fs';
import screenshot from 'desktop-screenshot';

const path = `${process.cwd()}/.screenshot.png`;

export default async function take() {
  return new Promise((resolve, reject) => {
    screenshot(path, (err) => {
      if (err) {
        reject(err);
      } else {
        readFile(path, (fileError, data) => {
          if (fileError) {
            reject(fileError);
          } else {
            resolve(data);
          }
        });
      }
    });
  });
}
