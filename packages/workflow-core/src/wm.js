export async function apply(wm, flow, waitFor) {
  return wm.apply(flow, waitFor);
}

export async function screen(wm) {
  return wm.screen();
}
