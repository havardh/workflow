# workflow-transformer-apply-arguments-to-fields

This transformer will call all functions, expect `open`, on all apps with
the arguments object. The arguments object contains the command line arguments
passed to the `workflow` command.

## Installation

```
npm install workflow-transformer-apply-arguments-to-fields
```

Add the plugin to your `~/.workflow/config.js` file.
```
import WorkflowTranformerApplyArgumentsToFields from "workflow-transformer-apply-arguments-to-fields";

export default {
  transformers: [new WorkflowTranformerApplyArgumentsToFields()]
  ...
};
```
## Example

This example contains a

```
export const flow = render(
  <Workspace name="File example" args=["file"]>
    <Atom file={({file}) => file} />
  </Workspace>
);
```

```
workflow AtomFile.js ./index.js
```
