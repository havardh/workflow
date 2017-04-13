from ..utils.config import parse_field


class XTerm:
    def __init__(self, app, args):
        self.command = parse_field(app['cmd'], args)
        self.cwd = parse_field(app['cwd'], args)
        self.args = [parse_field(arg, args) for arg in app['args']]

    def window_class(self):
        return "XTerm"

    def name(self):
        return self.command + " ".join(self.args)

    def cmd(self):
        cmd = self.command + " " + " ".join(self.args)
        name = self.name()

        return "cd %s && xterm -T '%s' -e '%s'" % (self.cwd, name, cmd)

    def __str__(self):
        return "XTerm[%s]" % self.name()
