import i3ipc
import os
import time
import argparse
import json
import tempfile

class Container:
    layout=None
    percent=None
    nodes=[]

    def __init__(self, layout, percent, nodes):
        self.layout = layout
        self.percent = percent
        self.nodes = nodes


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)

class App:
    percent=None
    swallows=None

    def __init__(self, percent, name):
        self.percent = percent
        self.swallows = [{"class": "^"+name+"$"}]

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)

data = Container("splitv", 1.0, [
    Container("splith", 0.8, [
        App(0.5, "Atom"),
        App(0.5, "Atom"),
    ]),
    App(0.2, "XTerm")
])

DEBUG=False

i3 = i3ipc.Connection()

def command(cmd):
    if DEBUG:
        print(cmd)
    else:
        i3.command(cmd)

def find_app_by_name_on_workspace(workspace, name):
    for leave in workspace.leaves():
        print(leave.name, name)
        if leave.name is not None and name in leave.name:
            return leave
    return None

def atom_name(folder, file):
    file_name = os.path.basename(file)
    return "%s — %s — Atom" % (file_name, folder.replace(os.path.expanduser("~"), "~"))

def terminal_name(folder, file):
    return "xterm | nw %s %s" % (folder, file)

def find_app_by_name(name):
    for workspace in i3.get_tree().workspaces():
        app = find_app_by_name_on_workspace(workspace, name)
        if app is not None:
            return app
    return None

def find_atom_app(folder, file):
    return find_app_by_name(atom_name(folder, file))

def create_workspace(name):
    command("workspace %s" % name)

def open_atom(folder, file, workspace_name):
    command("exec atom -n %s %s" % (folder.replace(os.path.expanduser("~"), "~"), file))


def open_terminal(folder, test_file, workspace_name):
    command("exec run-test %s %s" % (folder, test_file))

def get_current_workspace():
    tree = i3.get_tree()
    focused = tree.find_focused()
    return focused.workspace()

def current_workspace_contains_atom(folder, file):
    current_workspace = get_current_workspace()

    return find_app_by_name_on_workspace(current_workspace, atom_name(folder, file)) is not None

def current_workspace_contains_terminal(folder, test_file):
    current_workspace = get_current_workspace()

    return find_app_by_name_on_workspace(current_workspace, terminal_name(folder, test_file)) is not None

def get_test_file(file):
    return file.replace('src', 'test').replace('.js', '_tests.js')

def find_project_folder(file):
    folder = os.path.dirname(file)

    while folder != "/" and folder != "":
        if os.path.exists(folder + "/.git"):
            return folder
        else:
            folder = os.path.split(folder)[0]

    return os.path.dirname(file)

def atom_test(workspace_name, file):
    create_workspace(workspace_name)

    folder = find_project_folder(file)
    test_file = get_test_file(file)

    has_term = current_workspace_contains_terminal(folder, test_file)
    has_code = current_workspace_contains_atom(folder, file)
    has_test = current_workspace_contains_atom(folder, test_file)

    if not (has_term and has_code and has_test):
        f = tempfile.NamedTemporaryFile(mode="w", delete=True)
        f.write(data.toJSON() + "\n")
        f.flush()
        tmp_name = f.name

        command("focus parent, focus parent, focus parent, kill")
        time.sleep(1)


        folder = find_project_folder(file).replace(os.path.expanduser("~"), "~")
        test_file = get_test_file(file)

        command("append_layout %s" % tmp_name)

        open_terminal(folder, test_file, workspace_name)

        open_atom(folder, file, workspace_name)

        open_atom(folder, test_file, workspace_name)

        f.close()

def main():
    parser = argparse.ArgumentParser(description="Script for opening advisor:unit-testing")
    parser.add_argument("file", metavar='file')
    args = parser.parse_args()

    atom_test(
      workspace_name="advisor:unit-testing",
      file=args.file
    )

main()
