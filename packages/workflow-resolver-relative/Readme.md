# Workflow resolver for Relative paths

Workflow resolver for resolving flows relative to a given path. When using
this resolver, workflow will resolve flows relative to the given path
argument.

Installation

```
npm install --save workflow-resolver-relative
```

Usage in Workflow `config.js`.

```
import WorkflowResolverRelative from "workflow-resolver-relative";

export default {
  resolvers: [
    new WorkflowResolverRelative({
      path: "/path/to/dir", // path to resolve relative to.
      filter: /regex/       // regex filter on possible matches e.g. /.*.js$/
    })
  ],
 ...
};
```

This example will resolve `workflow Example.js` to `/path/to/dir/Example.js`.
