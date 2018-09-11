export async function apply(wm, flow, { args }) {
  return wm.apply(flow, { args });
}

export async function screen(wm, { args }) {
  return wm.screen({ args });
}
