/* eslint-env node */
/* eslint-disable class-methods-use-this */

import { exec } from "child_process";
import spawn from "cross-spawn";
import {difference} from "lodash";

const WinApi = require("./win_api");
import {findAllApps} from "shared/tree";

class Windows {

  constructor() {
    this.winApi = new WinApi();
  }

  async screen() {
    return new Promise((resolve) => {
      resolve(this.winApi.getDesktopRect());
    });
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    for (let app of apps) {
      const pid = await this.runCmd(app);
      await this.setPosition({...app, pid});
    }
  }

  async minimizeAll() {
    return this.winApi.minimizeAll();
  }

  async setPosition({ pid, position }) {
    return new Promise((resolve) => {
      const { left, top, width, height } = position;

      this.winApi.setPosition(pid, left, top, width, height);
      resolve();
    });
  }

  async getPids(program) {
    return new Promise((resolve, reject) => {
      exec(`tasklist /FI "IMAGENAME eq ${program}"`, (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          resolve(stdout);
        }
      })
    }).then(stdout => stdout
      .split('\n')
      .filter(line => line.startsWith(program))
      .map(
        line => line.split(/[ ]+/)[1]
      )
      );
  }

  async runWithStart({program, args, processName}) {
    const before = await this.getPids(processName || program);
    exec("start " + program + " " + (args || []).join(" "));
    const after = await this.getPids(processName || program);

    const [pid] = difference(after, before);
    return pid;
  }

  async runCmd(app) { // eslint-disable-line class-methods-use-this
    return new Promise(async (resolve) => {
      const {fn, start, processName} = app.open;

      const [program, ...args] = fn(app).split(' ');

      if (start) {
        resolve(await(this.runWithStart({program, args, processName})));
      } else {
        const options = { detached: true, cwd: app.cwd, stdio: "inherit" };
        const process = spawn(program, args || [], options);

        resolve(process.pid);
      }
    });
  }
}

module.exports = Windows;
