import os


class Atom:
    def __init__(self, folder, file):
        self.folder = folder
        self.file = file

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
