from ..utils.react import find_route

class GoogleChrome:
    def __init__(self, file):
        self.url = "http://localhost:9090/advisor/advisor/#" + find_route(file).replace(":caseRef", "1")

    def name(self):
        return "Advisory Application — Google Chrome"

    def cmd(self):
        return " google-chrome-stable --new-window %s" % self.url
