import sys
import win32gui
import win32con

[ignore, app_name, x, y, width, height] = sys.argv

x = int(x)
y = int(y)
right = x + int(width)
bottom = y + int(height)


def callback(hwnd, extra):
    if app_name in win32gui.GetWindowText(hwnd):
        win32gui.SetWindowPos(
            hwnd,
            win32con.HWND_TOP,
            x,
            y,
            right,
            bottom,
            0
        )
		
win32gui.EnumWindows(callback, None)
