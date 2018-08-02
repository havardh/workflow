import React from 'react';

import { App } from 'workflow-react';

const File = ({ file }) => <App open={() => `(find-file "${file}")`} />;

const MagitStatus = ({ path }) => (
  <App
    open={() => `
(let (remember-original-function magit-display-buffer-function)
  (setq magit-display-buffer-function
        (lambda (buffer)
          (display-buffer buffer '(display-buffer-same-window))))
  (magit-status)
  (setq magit-display-buffer-function remember-original-function))
`}
  />
);

const Magit = { MagitStatus };

const Plugins = { Magit };

export { File, Plugins };
