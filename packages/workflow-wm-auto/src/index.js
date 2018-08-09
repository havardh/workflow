import { platform, wm } from "shared/env";

if (platform === "osx" && wm === "default") {
  module.exports = require("workflow-wm-osx");
} else if (platform === "win32" && wm === "default") {
  module.exports = require("workflow-wm-windows");
} else if (platform === "linux" && wm === "i3") {
  module.exports = require("workflow-wm-i3");
} else if (platform === "linux" && wm === "wmctrl") {
  module.exports = require("workflow-wm-wmctrl");
} else {
  throw new Error("Platform and/or wm not supported " + platform + "/" + wm);
}
