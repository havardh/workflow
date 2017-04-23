import os

from ..utils.config import parse_field


class Code:
    def __init__(self, app, args):
        self.window_class = "Code"
        self.file = parse_field(app['file'], args)

    def name(self):
        file_name = os.path.basename(self.file)
        return "%s - Visual Studio Code" % file_name

    def cmd(self):
        return "code -n %s" % self.file
