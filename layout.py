import sys
from atom import Atom
from xterm import XTerm
from chrome import GoogleChrome
from slack import Slack
from idea import Idea
import json
import yaml

class Workspace:
    name=None
    apps=[]
    layout=[]

    def __init__(self, name, layout, apps):
        self.name = name
        self.layout = layout
        self.apps = apps

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

def parse_field(field, app, meta):
    if not field in app:
        return None

    if app[field] in meta:
        return meta[app[field]]
    else:
        return app[field]

def parse_app(app, meta):
    if app['name'] == "Atom":
        return Atom(
            folder=parse_field('folder', app, meta),
            file=parse_field('file', app, meta)
        )
    elif app['name'] == "Google-chrome":
        return GoogleChrome(
            file=parse_field('file', app, meta)
        )
    elif app['name'] == "XTerm":
        return XTerm(
            command=app['cmd'],
            cwd=parse_field('cwd', app, meta),
            args=[meta[arg] for arg in app['args']]
        )
    elif app['name'] == "Slack":
        return Slack()
    elif app['name'] == "idea":
        return Idea(folder=parse_field('folder', app, meta))

def parse_apps(root, meta):
    apps = []
    nodes = [root]

    while nodes:
        node = nodes.pop(0)
        if 'container' in node:
            container = node['container']
            nodes.extend(container['children'])
        elif 'app' in node:
            apps.append(parse_app(node['app'], meta))

    return apps

def parse_workspace(workspace, meta):

    layout = parse_layout(workspace['root'])
    apps = parse_apps(workspace['root'], meta)

    return Workspace(workspace['name'], layout, apps)

def parse_workspaces(config, meta):
    if 'workspace' in config:
        return [parse_workspace(config['workspace'], meta)]
    elif 'workspaces' in config:
        workspaces=[]
        for workspace in config['workspaces']:
            workspaces.append(parse_workspace(workspace['workspace'], meta))
        return workspaces
    else:
        return []


def parse(config_file, meta):

    f = open(config_file)
    config = yaml.load(f)
    f.close()

    return parse_workspaces(config, meta)
