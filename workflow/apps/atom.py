import os

from ..utils.config import parse_field


class Atom:

    def __init__(self, app, args):
        self.file = parse_field(app['file'], args)
        self.folder = parse_field(app['folder'], args)

    def window_class(self):
        return "Atom"

    def name(self):
        if self.file is not None:
            file_name = os.path.basename(self.file)
        else:
            file_name = self.folder

        return "%s — %s — Atom" % (file_name, self.folder.replace(os.path.expanduser("~"), "~"))

    def cmd(self):
        return "atom -n %s %s" % (self.folder.replace(os.path.expanduser("~"), "~"),
                                  self.file if self.file is not None else "")

    def __str__(self):
        return "Atom(%s)" % self.file
