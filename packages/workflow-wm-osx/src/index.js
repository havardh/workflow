/* eslint-env node */
/* eslint-disable no-console */
import * as osascript from 'osascript';
import shell from 'shelljs';

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

    const scripts = [];
    for (let app of apps) {
      app = mapPosition(app);
      app = openChildApps(app);

      scripts.push(createScript(mapPosition(app)));
    }

    await runScripts(scripts);
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

function openChildApps(app) {
  return {
    ...app,
    open: typeof app.open === 'function' && app.name !== 'iTerm' ? app.open(app) : app.open,
    children: (app.children || []).map(openChildApps),
  };
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

function createScript(app) {
  return `
    (function () {
      const app = ${JSON.stringify(app, null, 2)};

      ${app.open.toString()}

      const window = open(app);
      window.bounds = app.position;
    }());
  `;
}

async function runScripts(scripts) {
  return new Promise((resolve, reject) => {
    const script = scripts.join(`
      delay(0.5);
    `);

    osascript.eval(script, function(err, result) {
      if (err) {
        console.error('Failed to execute osascript:');
        console.error(script);
        console.error();

        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = Osx;
