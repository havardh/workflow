/* eslint-env node */
/* eslint-disable no-console, no-inner-declarations */
import ffi from 'ffi';
import ref from 'ref';
import Struct from 'ref-struct';

const HWND_TOP = 0;
const FLAG = 0;
const SW_MINIMIZE = 6;

const Rect = Struct({
  left: 'long',
  top: 'long',
  right: 'long',
  bottom: 'long',
});
const RectPtr = ref.refType(Rect);
const LPDWORD = ref.refType(ffi.types.ulong);
const StrPtr = ref.refType(ffi.types.CString);
const IntPtr = ref.refType(ffi.types.int32);

const user32 = new ffi.Library('user32', {
  GetDesktopWindow: ['int32', []],
  GetWindowRect: ['bool', ['int32', RectPtr]],
  GetClassNameA: ['int32', ['int32', StrPtr, 'int32']],
  ShowWindow: ['bool', ['int32', 'int32']],
  IsWindowVisible: ['bool', ['int32']],
  IsWindowEnabled: ['bool', ['int32']],
  EnumWindows: ['void', ['pointer', IntPtr]],
  SetWindowPos: ['bool', ['int32', 'int32', 'int32', 'int32', 'int32', 'int32', 'int32']],
  GetWindowThreadProcessId: ['uint32', ['int32', LPDWORD]],
});

export function getDesktopRect() {
  const wnd = user32.GetDesktopWindow();
  const rect = new Rect();
  user32.GetWindowRect(wnd, rect.ref());
  const { top, left, right, bottom } = rect;

  const width = right - left;
  const height = bottom - top;

  return { left, top, width, height };
}

export function minimizeAll() {
  var callback = ffi.Callback('bool', ['int32', IntPtr], hwnd => {
    if (user32.IsWindowVisible(hwnd) && user32.IsWindowEnabled(hwnd)) {
      user32.ShowWindow(hwnd, SW_MINIMIZE);
    }
    return true;
  });

  const int = ref.alloc('int32');
  user32.EnumWindows(callback, int);
}

export function getListOfWindows(className) {
  let ids = [];

  var callback = ffi.Callback('bool', ['int32', IntPtr], hwnd => {
    if (user32.IsWindowVisible(hwnd) && user32.IsWindowEnabled(hwnd)) {
      let buffer, name;
      buffer = new Buffer(256);
      user32.GetClassNameA(hwnd, buffer, 255);
      name = ref.readCString(buffer, 0);

      if (name === className) {
        ids.push(hwnd);
      }
    }
    return true;
  });

  const int = ref.alloc('int32');
  user32.EnumWindows(callback, int);

  return ids;
}

export function setPositionByWindowId(windowId, x, y, width, height) {
  user32.SetWindowPos(windowId, HWND_TOP, x, y, width, height, FLAG);
}

export function setPosition(pid, x, y, width, height) {
  let windowId = 0;
  for (let i = 0; windowId == 0 && i < 200; i++) {
    var callback = ffi.Callback('bool', ['int32', IntPtr], (hwnd, outHwnd) => {
      if (user32.IsWindowVisible(hwnd) && user32.IsWindowEnabled(hwnd)) {
        const lpdword = ref.alloc(LPDWORD);
        user32.GetWindowThreadProcessId(hwnd, lpdword);
        const window_pid = lpdword.readInt32LE(0);
        if (pid == window_pid) {
          outHwnd.writeInt32LE(hwnd, 0);
          return false;
        }
      }
      return true;
    });

    const int = ref.alloc('int32');
    user32.EnumWindows(callback, int);
    windowId = int.readInt32LE(0);
  }

  user32.SetWindowPos(windowId, HWND_TOP, x, y, width, height, FLAG);
}
