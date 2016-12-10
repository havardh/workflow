import i3ipc

class Wm:
    def __init__(self, debug=False):
        self.con = i3ipc.Connection()
        self.debug = debug

    def command(self, cmd):
        if self.debug:
            print(cmd)
        else:
            self.con.command(cmd)

    def tree(self):
        return self.con.get_tree()

    def get_current_workspace(self):
        tree = self.con.get_tree()
        focused = tree.find_focused()
        return focused.workspace()

    def has_app(self, name):

        workspace = self.get_current_workspace()

        for leave in workspace.leaves():
            print(leave.name, name)
            if leave.name is not None and name in leave.name:
                return True
        return False
