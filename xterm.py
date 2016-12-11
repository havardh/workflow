class XTerm:
    def __init__(self, command, args, cwd):
        self.command = command
        self.args = args
        self.cwd = cwd

    def name(self):
        return self.command + " ".join(self.args)

    def cmd(self):
        cmd = self.command + " ".join(self.args)
        name = self.name()
        print(cmd)

        return "cd %s && xterm -T '%s' -e '%s'" % (self.cwd, name, cmd)
