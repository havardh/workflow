class Idea:
    def __init__(self, folder):
        self.folder = folder

    def name(self):
        return "jetbrains-idea"

    def cmd(self):
        return "intellij-idea-ultimate-edition %s" % self.folder
