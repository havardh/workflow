# Workflow loader babel

A loader plugin for loading flows with babel.


## Usage

The babel loader should be used in the loaders property in a workflow-home `config.js` file.

```
const WorkflowLoaderBabel = require("workflow-loader-babel");

const config = { <babel configuration> };

module.exports = {
  ...
  loaders: [{
    loader: new WorkflowLoaderBabel({config})
  }]
  ...
};

```
