/* eslint-env node */
const {execSync} = require("child_process");
const {which} = require("./shell");

const platform = process.platform;

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

const wm = (() => {
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


module.exports = { platform, wm };
