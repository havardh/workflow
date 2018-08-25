# emacs app for workflow

Workflow emacs app with layout management within the emacs session.

This package is currently written to be used with `workflow-wm-terminal`. Support
for graphical windows managers are planned. Look at the [`cli.js`](cli.js) file for
an example of how to configure a `config.js` to use this package.

The `SplitV` and `SplitH` layouts exported by `workflow-layouts-tiled` can be used to create
tiling layouts. The `File` and `Plugin.Magit.MagitStatus` exported by this package
is used to open buffers inside the layouts. Check out the [`emacs.js`](flows/emacs.js) example.
