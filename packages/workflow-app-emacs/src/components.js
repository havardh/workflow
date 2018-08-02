// @flow
import React from 'react';

import { App } from 'workflow-react';

const File = ({ file }: { file: string }) => <App open={() => `(find-file "${file}")`} />;

const MagitStatus = ({ path }: { path: string }) => (
  <App
    open={() => `
(let (remember-original-function magit-display-buffer-function)
  (setq magit-display-buffer-function
        (lambda (buffer)
          (display-buffer buffer '(display-buffer-same-window))))
  (magit-status${path ? ' ' + path : ''})
  (setq magit-display-buffer-function remember-original-function))
`}
  />
);

const Magit = { MagitStatus };

const Plugins = { Magit };

export { File, Plugins };
