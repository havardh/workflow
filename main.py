import os
import argparse
import json

from i3 import Wm
from atom import Atom
from run_test import RunTest

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

    folder = find_project_folder(file).replace(os.path.expanduser("~"), "~")
    test_file = get_test_file(file)

    atom_code = Atom(folder, file)
    atom_test = Atom(folder, test_file)
    term_test = RunTest(folder, test_file)

    has_term = wm.has_app(term_test)
    has_code = wm.has_app(atom_code)
    has_test = wm.has_app(atom_test)

    if not (has_term and has_code and has_test):
        wm.clear_workspace()

        wm.create_layout(data)

        wm.open(term_test.cmd())
        wm.open(atom_code.cmd())
        wm.open(atom_test.cmd())

def main():
    parser = argparse.ArgumentParser(description="Script for opening advisor:unit-testing")
    parser.add_argument("file", metavar='file')
    args = parser.parse_args()

    atom_test(
      workspace_name="advisor:unit-testing",
      file=args.file
    )

main()
