from .layout import parse
from .utils.files import find_project_folder, get_test_file
from .window_managers import Wm


def run(config_file, file):
    window_manager = Wm()

    workflow = parse(config_file, meta={
        "file": file,
        "folder": find_project_folder(file),
        "test_file": get_test_file(file)
    })

    window_manager.setup_workflow(workflow)
