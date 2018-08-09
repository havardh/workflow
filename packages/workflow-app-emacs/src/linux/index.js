/* @flow */

import unixOpen from "../commmon/open";

async function open({ file }, context, children) {
  return unixOpen({ file, flags: "" }, context, children);
}

export default open;
