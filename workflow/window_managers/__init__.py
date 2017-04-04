import platform

system = platform.system()

if system == 'Linux':
    from .i3 import Wm
else:
    raise NotImplementedError('Your window manager is not supported')
