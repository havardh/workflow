# Workflow resolver for Absolute paths

Workflow resolver for resolving flows at an absolute path.

## Installation

```
npm install --save workflow-resolver-absolute
```

## Usage in Workflow `config.js`.

```
import { WorkflowResolverAbsolute } from "workflow-resolver-absolute";

export const config = {
  resolvers: [
    new WorkflowResolverAbsolute()
  ],
 ...
};
```

This example will resolve `workflow /path/to/dir/Example.js` to `/path/to/dir/Example.js`.
