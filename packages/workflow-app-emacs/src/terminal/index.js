import unixOpen from "../commmon/open";

async function open({ file }, context, children) {
  return unixOpen({ file, flags: "-nw" }, context, children);
}

export default open;
