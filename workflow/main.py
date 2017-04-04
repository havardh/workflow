from .file_util import *
from .i3 import Wm

from workflow.layout import parse

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
