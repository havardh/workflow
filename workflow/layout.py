import json

import yaml

from .apps.atom import Atom
from .apps.chrome import GoogleChrome
from .apps.code import Code
from .apps.emacs import Emacs
from .apps.idea import Idea
from .apps.slack import Slack
from .apps.xterm import XTerm


class Workspace:
    name = None
    apps = []
    layout = []

    def __init__(self, name, layout, apps):
        self.name = name
        self.layout = layout
        self.apps = apps


class Container:
    layout = None
    percent = None
    nodes = []

    def __init__(self, layout, percent, nodes):
        self.layout = layout
        self.percent = percent
        self.nodes = nodes

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class App:
    percent = None
    swallows = None

    def __init__(self, percent, name):
        self.percent = percent
        self.swallows = [{"class": "^" + name + "$"}]

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
    if field not in app:
        return None

    if app[field] in meta:
        return meta[app[field]]
    else:
        return app[field]


def parse_app(app, args):
    if app['name'] == "Atom":
        return Atom(app, args)
    elif app['name'] == "Google-chrome":
        return GoogleChrome(app, args)
    elif app['name'] == "XTerm":
        return XTerm(app, args)
    elif app['name'] == "Slack":
        return Slack(app, args)
    elif app['name'] == "Idea":
        return Idea(app, args)
    elif app['name'] == "Code":
        return Code(app, args)
    elif app['name'] == "Emacs":
        return Emacs(app, args)


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
        workspaces = []
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
