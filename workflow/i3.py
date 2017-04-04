import i3ipc
import time
import tempfile

class Wm:
    def __init__(self, debug=False):
        self.con = i3ipc.Connection()
        self.debug = debug

    def create_workspace(self, workspace):
        self.command("workspace %s" % workspace.name)

    def clear_workspace(self):
        self.command("focus parent, focus parent, focus parent, kill")
        time.sleep(1)

    def create_layout(self, layout):
        f = tempfile.NamedTemporaryFile(mode="w", delete=True)
        f.write(layout.toJSON() + "\n")
        f.flush()
        tmp_name = f.name

        self.command("append_layout %s" % tmp_name)
        time.sleep(1)

        f.close()

    def command(self, cmd):
        if self.debug:
            print(cmd)
        else:
            self.con.command(cmd)

    def open(self, cmd):
        self.command("exec " + cmd)

    def tree(self):
        return self.con.get_tree()

    def get_current_workspace(self):
        tree = self.con.get_tree()
        focused = tree.find_focused()
        return focused.workspace()

    def has_app(self, app):
        workspace = self.get_current_workspace()

        for leave in workspace.leaves():
            if leave.name is not None and app.name() in leave.name:
                return True
        return False
