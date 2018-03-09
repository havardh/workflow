import osascript from "node-osascript";

import {spawn} from "child_process";
import {difference} from "lodash";

import Tile from './tile';
import shell from 'shelljs';

function reflect(promise){
    return promise
      .then(v => ({v, resolved: true }), e => ({e, resolved: false }));
}

function setPositionScript(pid, rect) {
  const {x, y, width, height} = rect;
  return `
    tell application "System Events"
      set appList to (id of every process whose unix id is ${pid})
    end tell
    tell application "System Events"
      repeat with appProcess in appList
        tell process id appProcess
          set position of window 1 to {${x}, ${y}}
          set size of window 1 to {${width}, ${height}}
        end tell
      end repeat
    end tell
    tell application "System Events"
      set frontmost of every process whose unix id is ${pid} to true
    end tell
  `;
}

export default class Osx extends Tile {

  async getDesktopRect() {
    const result = shell.exec(
      `system_profiler SPDisplaysDataType | grep Resolution | awk '{ printf "{\\"width\\": %s, \\"height\\": %s}", $2, $4 }'`,
      { silent: true}
    );

    const {width, height} = JSON.parse(result.stdout);

    return { x: 0, y: 0, width, height };
  }

  async setPosition({app, position}) {
    return new Promise((resolve, reject) => {
      Promise.all(app.pid.map(pid => new Promise((resolve, reject) => {
        const script = setPositionScript(pid, position);

        osascript.execute(script, function(err, result) {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      })).map(reflect)).then(result => {
        const resolved = result.filter(({resolved})=> resolved);
        const rejected = result.filter(({resolved})=> !resolved);

        if (resolved.length) {
          resolve(resolved[0]);
        } else {
          reject(rejected[0]);
        }
      });
    });
  }

  async runCmd(app) { // eslint-disable-line class-methods-use-this
    return new Promise((resolve) => {
      const program = "/usr/bin/open";
      const args = ["-a", app.name, app.open];

      /*const pidsBefore = shell.exec(
        `ps aux | grep -v grep | grep -i "${app.name}" | awk '{print $2;}'`,
        {silent: true}
      ).stdout.split('\n').filter(str => str.length);*/

      const options = { detached: true, cwd: app.cwd, stdio: "inherit" };
      spawn(program, args || [], options);

      const pids = shell.exec(
        `ps aux | grep -v grep | grep -i "${app.name}" | awk '{print $2;}'`,
        {silent: true}
      ).stdout.split('\n').filter(str => str.length);


      // const pids = difference(pidsAfter, pidsBefore);

      resolve(pids);
    });
  }
}
