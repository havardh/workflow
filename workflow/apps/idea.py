from ..utils.config import parse_field


class Idea:
    def __init__(self, app, args):
        self.folder = parse_field(app['folder'], args)

    def window_class(self):
        return "jetbrains-idea"

    def name(self):
        return "jetbrains-idea"

    def cmd(self):
        return "intellij-idea-ultimate-edition %s" % self.folder
