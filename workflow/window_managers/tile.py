import time

from .base import AbstractWm
from ..layout import App, Container


class TileWm(AbstractWm):

    def get_desktop_rect(self):
        raise NotImplementedError()

    def set_position(self, app):
        raise NotImplementedError()

    def run_cmd(self, cmd):
        raise NotImplementedError()

    @property
    def is_supported_in_current_environment(self):
        return False

    def setup_workflow(self, workflow):
        for workspace in workflow:
            rect = self.get_desktop_rect()
            self.open_node(workspace.layout, rect)

            time.sleep(2)

            for app in workspace.app_list():
                self.set_position(app)

    def open_node(self, node, rect):
        if isinstance(node, Container):
            self.open_container(node, rect)
        elif isinstance(node, App):
            self.open_app(node, rect)

    def open_container(self, container, rect):
        (left, top, right, bottom) = rect

        width = right - left
        height = bottom - top

        if container.layout == "splith":
            this_left = left
            for node in container.children:
                this_right = int(width * node.percent)
                self.open_node(node, (this_left, top, this_right, bottom))
                this_left += this_right
        elif container.layout == "splitv":
            this_top = top
            for node in container.children:
                this_bottom = int(height * node.percent)
                self.open_node(node, (left, this_top, right, this_bottom))
                this_top += this_bottom

    def open_app(self, app, rect):
        app.app.rect = rect
        self.run_cmd(app.app.cmd())
