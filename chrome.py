import os

class GoogleChrome:
    def __init__(self, url):
        self.url = url

    def name(self):
        return "Advisory Application — Google Chrome"

    def cmd(self):
        return " google-chrome-stable --new-window %s" % self.url
