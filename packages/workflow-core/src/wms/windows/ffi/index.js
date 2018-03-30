// @flow
/* eslint-disable class-methods-use-this */
import * as WinApi from "./win_api"
import Tile from '../../tile';
import { spawn, exec } from "child_process";
import {difference} from "lodash";

import type { App } from '../../../parser/config';
import type { Rect } from '../../tile';

class Windows extends Tile {

  async getDesktopRect() {
    return new Promise((resolve) => {
      resolve(WinApi.getDesktopRect());
    });
  }

  async setPosition({ app, position }: {app: App, position: Rect}) {
    return new Promise((resolve) => {
      const { x, y, width, height } = position;

      WinApi.setPosition(app.pid, x, y, width, height);
      resolve();
    });
  }

  async getPids(program: string) {
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

  async runWithStart({program, args}: {program: string, args: Array<string>}) {
    const before = await this.getPids(program);
    exec("start " + program + " " + (args || []).join(" "));
    const after = await this.getPids(program);

    const [pid] = difference(after, before);
    return pid;
  }

  async runCmd(app: App) { // eslint-disable-line class-methods-use-this
    return new Promise(async (resolve) => {
      const {program, start, args} = app.windows;

      if (start) {
        resolve(await(this.runWithStart({program, args})));
      } else {
        const options = { detached: true, cwd: app.cwd, stdio: "inherit" };
        const process = spawn(program, args || [], options);
        resolve(process.pid);
      }
    });
  }
}

export default Windows;
