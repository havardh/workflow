from ..utils.config import parse_field


class Emacs:
    def __init__(self, app, args):
        self.file = parse_field(app['file'], args)

    def name(self):
        return "emacs"

    def cmd(self):
        return "emc %s" % self.file
