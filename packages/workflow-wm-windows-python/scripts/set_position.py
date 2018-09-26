import sys
import win32gui
import win32con
import win32process
import time

[pid, x, y, width, height] = sys.argv[1:]

x = int(float(x))
y = int(float(y))
right = int(float(width))
bottom = int(float(height))

def get_hwnd_for_pid (pid):
  def callback (hwnd, hwnds):
    if win32gui.IsWindowVisible (hwnd) and win32gui.IsWindowEnabled (hwnd):
      _, found_pid = win32process.GetWindowThreadProcessId (hwnd)
      if found_pid == pid:
        hwnds.append (hwnd)
    return True

  hwnds = []
  win32gui.EnumWindows (callback, hwnds)
  return hwnds

hwnds = get_hwnd_for_pid(int(pid))

for hwnd in hwnds:
    win32gui.SetWindowPos(
        hwnd,
        win32con.HWND_TOP,
        x,
        y,
        right,
        bottom,
        0
    )
