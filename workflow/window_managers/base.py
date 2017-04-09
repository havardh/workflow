
class AbstractWm:
    def __init__(self, debug=False):
        self.debug = debug

    def setup_workflow(self, workflow):
        raise NotImplementedError()

    @property
    def is_supported_in_current_environment(self):
        return False
