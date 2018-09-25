import win32gui
desktopWnd = win32gui.GetDesktopWindow()
rect = win32gui.GetWindowRect(desktopWnd)

(x, y, right, bottom) = rect

width = right - x
height = bottom - y

print('{ "left": %s, "top": %s, "width": %s, "height": %s }' % (x, y, width, height))
