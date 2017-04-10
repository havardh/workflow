from ..utils.config import parse_field


class GoogleChrome:
    def __init__(self, app, args):
        self.url = parse_field(app['url'], args)

    def name(self):
        return "Advisory Application — Google Chrome"

    def cmd(self):
        return " google-chrome-stable --new-window %s" % self.url
