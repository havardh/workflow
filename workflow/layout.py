import yaml

from .apps.atom import Atom
from .apps.bash import Bash
from .apps.chrome import GoogleChrome
from .apps.code import Code
from .apps.emacs import Emacs
from .apps.idea import Idea
from .apps.notepad import Notepad
from .apps.slack import Slack
from .apps.xterm import XTerm

APPS = {
    'Atom': Atom,
    'GoogleChrome': GoogleChrome,
    'Code': Code,
    'Emacs': Emacs,
    'Idea': Idea,
    'Slack': Slack,
    'XTerm': XTerm,
    'Notepad': Notepad,
    'Bash': Bash
}


class Workspace:
    name = None
    layout = []

    def __init__(self, name, layout):
        self.name = name
        self.layout = layout

    def app_list(self):
        nodes = [self.layout]
        apps = []

        while nodes:
            node = nodes.pop()
            if isinstance(node, Container):
                nodes.extend(node.children)
            else:
                apps.append(node.app)

        return apps


class Container:
    layout = None
    percent = None
    children = []

    def __init__(self, layout, percent, children):
        self.layout = layout
        self.percent = percent
        self.children = children


class App:
    percent = None
    app = None

    def __init__(self, percent, app):
        self.percent = percent
        self.app = app


def parse_app(app, args):
    return APPS[app['name']](app, args)


def parse_layout(node, args):
    if 'container' in node:
        container = node['container']
        return Container(
            layout=container['layout'],
            percent=container['percent'],
            children=[parse_layout(child, args) for child in container['children']]
        )
    elif 'app' in node:
        app = node['app']
        return App(app['percent'], parse_app(app, args))
    else:
        return None


def parse_workspace(workspace, args):
    return Workspace(
        workspace['name'],
        parse_layout(workspace['root'], args)
    )


def parse_workspaces(config, args):
    if 'workspace' in config:
        return [parse_workspace(config['workspace'], args)]
    elif 'workspaces' in config:
        workspaces = []
        for workspace in config['workspaces']:
            workspaces.append(parse_workspace(workspace['workspace'], args))
        return workspaces
    else:
        return []


def parse(config_file, args):
    f = open(config_file)
    config = yaml.load(f)
    f.close()

    return parse_workspaces(config, args)
