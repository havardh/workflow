import sys
import win32gui
import win32con
import win32process
import time

[class_name] = sys.argv[1:]


def get_hwnd_for_classname (class_name):
  def callback (hwnd, hwnds):
    if win32gui.IsWindowVisible (hwnd) and win32gui.IsWindowEnabled (hwnd):
      className = win32gui.GetClassName(hwnd)
      if win32gui.GetClassName(hwnd) == class_name:
        hwnds.append (hwnd)
    return True

  hwnds = []
  win32gui.EnumWindows (callback, hwnds)
  return hwnds

hwnds = get_hwnd_for_classname(class_name)

print(hwnds)
