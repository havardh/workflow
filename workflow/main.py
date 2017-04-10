from .layout import parse
from .window_managers import Wm


def run(config_file, file):
    window_manager = Wm()

    args = {'file': file}

    workflow = parse(config_file, args)

    window_manager.setup_workflow(workflow)
