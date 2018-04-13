import React from "react";
import {App} from "workflow-react";

export const Vim = ({file}) => (
  <App cmd={`vim ${file}`} />
);

export const Cmd = ({cwd, cmd}) => (
  <App cwd={cwd} cmd={cmd} />
);

export const Emacs = ({file}) => (
  <App cmd={`emacs -nw ${file}`} />
);
