import os
import argparse
import json

from i3 import Wm
from atom import Atom
from xterm import XTerm
from file_util import *

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

def parse_definition(meta):
    workspace = "advisor:unit-testing",

    layout = Container("splitv", 1.0, [
        Container("splith", 0.8, [
            App(0.5, "Atom"),
            App(0.5, "Atom"),
        ]),
        App(0.2, "XTerm")
    ])

    (file, folder, test_file) = meta

    apps = [
        Atom(folder, file),
        Atom(folder, test_file),
        XTerm("npm run watch:test:base -- ", [test_file], folder)
    ]

    return (workspace, layout, apps)


def atom_test(file):
    wm = Wm()

    meta = (file, find_project_folder(file), get_test_file(file))
    (workspace, layout, apps) = parse_definition(meta)

    wm.create_workspace(workspace)

    has_all_apps=True
    for app in apps:
        if not wm.has_app(app):
            has_all_apps=False

    if not has_all_apps:
        wm.clear_workspace()

        wm.create_layout(layout)

        for app in apps:
            wm.open(app.cmd())

def main():
    parser = argparse.ArgumentParser(description="Script for opening advisor:unit-testing")
    parser.add_argument("file", metavar='file')
    args = parser.parse_args()

    atom_test(args.file)

main()
