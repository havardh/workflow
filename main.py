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
    (workspace, layout, apps) = parse(config_file, meta)

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
    parser.add_argument("config_file", metavar='config_file')
    parser.add_argument("file", metavar='file')
    args = parser.parse_args()

    run(args.config_file, args.file)

main()
