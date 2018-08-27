# Workflow parser arguments

Argument parse for the arguments given in the flow file from the positional arguments
leading the name of the `flow` file.

Use in combination with `workflow-transformer-apply-arguments-to-fields`.

## Example

```
// flows/Example.js

export default render(
  <Workspace name="workflow-arguments" args="file">
    <TextEditor file={({file}) => file} />
  </Workspace>
)
```

## Usage
This will open the index.js file in the default text editor.

```
workflow Example.js index.js
```

