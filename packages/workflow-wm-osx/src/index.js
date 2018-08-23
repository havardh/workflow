/* eslint-env node */
/* eslint-disable no-console */
import * as osascript from 'osascript';
import shell from 'shelljs';
import { run } from '@jxa/run';

import { findAllApps } from 'shared/tree';

async function wrapperRun(code, ...args) {
  try {
    await run(code, ...args);
  } catch (error) {
    console.error('Could not execute jxa:');
    console.log(code.toString());
    console.log();
    console.error(error);
    throw error;
  }
}

class Osx {
  async screen() {
    const result = shell.exec(
      `system_profiler SPDisplaysDataType | grep Resolution | awk '{ printf "{\\"width\\": %s, \\"height\\": %s}", $2, $4 }'`,
      { silent: true }
    );

    const { width, height } = JSON.parse(result.stdout);

    return { left: 0, top: 0, width, height };
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    for (let app of apps) {
      app = mapPosition(app);

      await app.open(app, { platform: 'osx', wm: 'default', run: wrapperRun }, app.children);
    }
  }

  async minimizeAll() {
    const script = `
    (function () {
      const applications = [ "Atom", "Safari", "iTerm" ];
      for (var i = 0; i<applications.length; i++) {
        const app = Application(applications[i]);
        for (var i=0; i<app.windows.length; i++) {
          app.windows[i].close();
        }
      }
      delay(1);

      for (var i = 0; i<applications.length; i++) {
        const app = Application(applications[i]);
        for (var i=0; i<app.windows.length; i++) {
          app.windows[i].close();
        }
      }
    }());
    `;

    return new Promise((resolve, reject) => {
      osascript.eval(script, function(err, result) {
        if (err) {
          console.error('Failed to execute osascript:');
          console.log(err);
          console.error(script);
          console.error();

          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

function mapPosition(app) {
  const { position } = app;

  return {
    ...app,
    position: {
      x: position.left,
      y: position.top,
      width: position.width,
      height: position.height,
    },
  };
}

module.exports = Osx;
