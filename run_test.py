class RunTest:
    def __init__(self, folder, file):
        self.folder = folder
        self.file = file

    def name(self):
        return "xterm | nw %s %s" % (self.folder, self.file)

    def cmd(self):
        return "run-test %s %s" % (self.folder, self.file)
