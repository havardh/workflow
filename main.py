import os
import argparse

from i3 import Wm
from file_util import *
from layout import parse

def run(config_file, file):
    wm = Wm()

    meta = {
        "file": file,
        "folder": find_project_folder(file),
        "test_file": get_test_file(file)
    }
    workspaces = parse(config_file, meta)

    for workspace in workspaces:
        wm.create_workspace(workspace)

        has_all_apps=True
        for app in workspace.apps:
            if not wm.has_app(app):
                has_all_apps=False

        if not has_all_apps:
            wm.clear_workspace()

            wm.create_layout(workspace.layout)

            for app in workspace.apps:
                wm.open(app.cmd())

def main():
    parser = argparse.ArgumentParser(description="Script for opening advisor:unit-testing")
    parser.add_argument("config_file", metavar='config_file')
    parser.add_argument("file", metavar='file')
    args = parser.parse_args()

    run(args.config_file, args.file)

main()
