from i3 import Wm
import os
import argparse
import json

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

wm = Wm()

def atom_name(folder, file):
    file_name = os.path.basename(file)
    return "%s — %s — Atom" % (file_name, folder.replace(os.path.expanduser("~"), "~"))

def terminal_name(folder, file):
    return "xterm | nw %s %s" % (folder, file)

def open_atom(folder, file):
    wm.open("atom -n %s %s" % (folder.replace(os.path.expanduser("~"), "~"), file))

def open_terminal(folder, test_file):
    wm.open("run-test %s %s" % (folder, test_file))

def current_workspace_contains_atom(folder, file):
    return wm.has_app(atom_name(folder, file))

def current_workspace_contains_terminal(folder, file):
    return wm.has_app(terminal_name(folder, file))

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
    wm.create_workspace(workspace_name)

    folder = find_project_folder(file)
    test_file = get_test_file(file)

    has_term = current_workspace_contains_terminal(folder, test_file)
    has_code = current_workspace_contains_atom(folder, file)
    has_test = current_workspace_contains_atom(folder, test_file)

    if not (has_term and has_code and has_test):


        wm.clear_workspace()

        folder = find_project_folder(file).replace(os.path.expanduser("~"), "~")
        test_file = get_test_file(file)

        wm.create_layout(data)

        open_terminal(folder, test_file)
        open_atom(folder, file)
        open_atom(folder, test_file)


def main():
    parser = argparse.ArgumentParser(description="Script for opening advisor:unit-testing")
    parser.add_argument("file", metavar='file')
    args = parser.parse_args()

    atom_test(
      workspace_name="advisor:unit-testing",
      file=args.file
    )

main()
