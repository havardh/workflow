from subprocess import Popen

from .tile import TileWm


class Wm(TileWm):

    @property
    def is_supported_in_current_environment(self):
        return True

    def get_desktop_rect(self):
        import win32gui
        desktopWnd = win32gui.GetDesktopWindow()
        return win32gui.GetWindowRect(desktopWnd)

    def set_position(self, app):
        import win32gui
        import win32con

        def callback(hwnd, extra):
            if win32gui.GetWindowText(hwnd) == app.name():
                win32gui.SetWindowPos(
                    hwnd,
                    win32con.HWND_TOP,
                    app.rect[0],
                    app.rect[1],
                    app.rect[2],
                    app.rect[3],
                    0
                )

        win32gui.EnumWindows(callback, None)

    def run_cmd(self, cmd):
        Popen(cmd, shell=True)
