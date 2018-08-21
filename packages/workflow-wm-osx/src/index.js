/* eslint-env node */
/* eslint-disable no-console */
import * as osascript from 'osascript';
import shell from 'shelljs';
import { run } from '@jxa/run';

import { findAllApps } from 'shared/tree';

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

      await app.open(app, { platform: 'osx', wm: 'default', run }, app.children);
    }
  }

  async minimizeAll() {
    const script = `
    (function () {
      for (var j=0; j<10; j++) {
        const terminal = Application("iTerm");
        for (var i=0; i<terminal.windows.length; i++) {
          terminal.windows[i].close();
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
