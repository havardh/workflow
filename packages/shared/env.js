/* eslint-env node */
import {execSync} from "child_process";
import {which} from "./shell";
import os from "os";

export const platform = process.platform;

function isRunningI3() {
  try {
    execSync("i3-msg 'exec echo 1'");
    return true;
  } catch(e) {
    return false;
  }
}

function isRunningWmctrl() {
  return which("wmctrl");
}

export const wm = (() => {
  switch (platform) {
    case "win32":
    case "darwin":
      return "default";
    case "linux": {
      if (isRunningI3()) {
        return "i3";
      } else if (isRunningWmctrl()) {
        return "wmctrl";
      }
      return "unknown";
    }
  }
  return "unknown";
})();

export const dev = (process.env.WORKFLOW_DEV_MODE === "true");
export const homedir = process.env.WORKFLOW_HOME;

export const baseFolder = dev
  ? `${__dirname}/../workflow-template`
  : (homedir || `${os.homedir()}/.workflow`);
