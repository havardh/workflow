import sys
from atom import Atom
from xterm import XTerm
from chrome import GoogleChrome
import json
import yaml

class Container:
    layout=None
    percent=None
    nodes=[]

    def __init__(self, layout, percent, nodes):
        self.layout = layout
        self.percent = percent
        self.nodes = nodes


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)

class App:
    percent=None
    swallows=None

    def __init__(self, percent, name):
        self.percent = percent
        self.swallows = [{"class": "^"+name+"$"}]

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
            sort_keys=True, indent=4)

def parse_layout(node):
    if 'container' in node:
        container = node['container']
        return Container(
            layout=container['layout'],
            percent=container['percent'],
            nodes=[parse_layout(child) for child in container['children']]
        )
    elif 'app' in node:
        app = node['app']
        return App(app['percent'], app['name'])
    else:
        return None

def parse_apps(root, meta):

    apps = []

    nodes = [root]

    while nodes:
        node = nodes.pop(0)
        if 'container' in node:
            container = node['container']
            nodes.extend(container['children'])
        elif 'app' in node:
            app = node['app']
            if app['name'] == "Atom":
                apps.append(Atom(
                    folder=meta[app['folder']],
                    file=meta[app['file']]
                ))
            if app['name'] == "Google-chrome":
                apps.append(GoogleChrome(
                    url=app['url']
                ))
            elif app['name'] == "XTerm":
                apps.append(XTerm(
                    command=app['cmd'],
                    cwd=meta[app['cwd']],
                    args=[meta[arg] for arg in app['args']]
                ))
    return apps


def parse(config_file, meta):

    f = open(config_file)
    config = yaml.load(f)
    f.close()

    workspace = config['workspace']
    layout = parse_layout(config['root'])
    apps = parse_apps(config['root'], meta)

    return (workspace, layout, apps)
