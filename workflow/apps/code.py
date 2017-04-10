from ..utils.config import parse_field


class Code:
    def __init__(self, app, args):

        self.file = parse_field(app['file'], args)

    def name(self):
        return "Code"

    def cmd(self):
        return "code %s" % self.file
