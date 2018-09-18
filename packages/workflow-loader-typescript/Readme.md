# Workflow loader for typescript files

Loads `.ts` files.

## Usage

See [`workflow-angular/cli.js`](`../workflow-angular/cli.js`) for an example.

```
const { WorkflowLoaderTypescript } = require("workflow-loader-typescript");


module.exports = { 
  config: {
    ...
    loaders: [{
      loader: new WorkflowLoaderTypescript({config: <typescript configuration>})
    }]
    ...
  }
}
```
