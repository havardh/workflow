import { open as unixOpen } from '../commmon/open';

export async function open({ file }, context, children) {
  return unixOpen({ file, flags: '' }, context, children);
}
