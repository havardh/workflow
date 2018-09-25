import sys
import win32gui
import win32con
import win32process
import time

[hwnd, x, y, width, height] = sys.argv[1:]

hwnd = int(hwnd)
x = int(float(x))
y = int(float(y))
right = int(float(width))
bottom = int(float(height))

win32gui.SetWindowPos(
  hwnd,
  win32con.HWND_TOP,
  x,
  y,
  right,
  bottom,
  0
)
