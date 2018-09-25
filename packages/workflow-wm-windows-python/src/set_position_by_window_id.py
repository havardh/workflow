import sys
import win32gui
import win32con
import win32process
import time

[hwnd, x, y, width, height] = sys.argv[1:]

hwnd = int(hwnd)
x = int(x)
y = int(y)
right = int(width)
bottom = int(height)

win32gui.SetWindowPos(
  hwnd,
  win32con.HWND_TOP,
  x,
  y,
  right,
  bottom,
  0
)
