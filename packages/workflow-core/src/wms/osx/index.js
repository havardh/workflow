import * as osascript from "osascript";
import shell from 'shelljs';

import Tile from '../tile';

function setPositionScript(app, position) {
  // Executed in jxa context
  function setPosition(window, position) {
    window.bounds = position;
  }

  const {open, run} = app.open;

  return `
    (function () {
      const app = ${JSON.stringify(app)};
      const position = ${JSON.stringify(position)};

      ${open.toString()}
      ${setPosition.toString()}
      ${run.toString()}

      const window = open(app);
      setPosition(window, position);
      run(window, app);
    }());
  `;
}

export default class Osx extends Tile {

  constructor() {
    super();
    this.scripts = [];
  }

  async getDesktopRect() {
    const result = shell.exec(
      `system_profiler SPDisplaysDataType | grep Resolution | awk '{ printf "{\\"width\\": %s, \\"height\\": %s}", $2, $4 }'`,
      { silent: true}
    );

    const {width, height} = JSON.parse(result.stdout);

    return { x: 0, y: 0, width, height };
  }

  async setPosition({app, position}) {
    const script = setPositionScript(app, position);

    this.scripts.push(script);

    return Promise.resolve();
  }

  async postApply() {
    return new Promise((resolve, reject) => {
      const script = this.scripts.join(`
        delay(0.5);
      `);

      osascript.eval(script,  function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    })
  }

  async runCmd() { // eslint-disable-line class-methods-use-this
    // app is opened in setPosition method
    return Promise.resolve({});
  }
}
