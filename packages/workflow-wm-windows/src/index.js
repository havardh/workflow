/* eslint-env node */
/* eslint-disable class-methods-use-this */

import difference from "lodash.difference";

import exec from "./powershell";
import * as winApi from "./win_api";
import { findAllApps } from "shared/tree";

const timeout = n => new Promise(resolve => setTimeout(resolve, n));

class Windows {
  async screen() {
    return new Promise(resolve => {
      resolve(winApi.getDesktopRect());
    });
  }

  async apply(layout) {
    const apps = findAllApps(layout);

    const { startOnPositionByWindowClass, startOnPositionByReturnedPid } = this;

    const context = {
      platform: "win32",
      wm: "default",
      startOnPositionByWindowClass,
      startOnPositionByReturnedPid
    };

    for (let app of apps) {
      await app.open(app, context, app.children);
    }
  }

  async startOnPositionByReturnedPid({ cmd, args, position }) {
    const pid = await exec(
      `Start-Process ${cmd} -PassThru "${args.join(" ")}"`
    );

    const { left, top, width, height } = position;
    winApi.setPosition(pid, left, top, width, height);
  }

  async startOnPositionByWindowClass({ cmd, args, className, position }) {
    const before = winApi.getListOfWindows(className);

    const pid = await exec(
      `Start-Process ${cmd} -PassThru "${args.join(" ")}"`
    );

    await timeout(1000);

    const after = winApi.getListOfWindows(className);

    const windowIds = difference(after, before);

    const { left, top, width, height } = position;
    for (let windowId of windowIds) {
      winApi.setPositionByWindowId(windowId, left, top, width, height);
    }
  }

  async minimizeAll() {
    return winApi.minimizeAll();
  }
}

module.exports = Windows;
