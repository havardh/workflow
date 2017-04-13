import os
from ..utils.config import parse_field


class Notepad:
    def __init__(self, app, args):
        self.file = parse_field(app['file'], args)

    def name(self):
        file_name = os.path.basename(self.file)
        return "%s - Notisblokk" % file_name

    def cmd(self):
        return "notepad %s" % self.file
