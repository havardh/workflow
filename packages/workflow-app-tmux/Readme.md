# tmux app for workflow

Workflow tmux app for workflow with layout management within the tmux
instance.

The `SplitV` and `SplitH` layouts exported by `workflow-layout-tiled` can be used
to create arbitrary tile layouts. They can contain a number of Apps or nested
layout components. The Apps used inside a `Tmux` application must support
the `terminal` wm. Some that do are: [`emacs`](../workflow-app-emacs), 
[`Vim`](../workflow-app-vim), [`Less`](../workflow-app-less), and 
[`Terminal`](../workflow-app-terminal).
Checkout the [flows/](flows) folder for examples.

## How to use

For now, the tmux app works only when running workflow to configure a single
terminal instance. This can be done by using the `workflow-wm-terminal` package. A minimal `config.js` example for how to use this is included below.


```js
const { join } = require("path");
const { WorkflowResolverRelative } = require("workflow-resolver-relative");
const { WorkflowResolverAbsolute } = require("workflow-resolver-absolute");
const { WorkflowLoaderBabel } = require("workflow-loader-babel");
const { WorkflowParserArguments } = require("workflow-parser-arguments");
const { WorkflowTransformerApplyArgumentsToFields } = require("workflow-transformer-apply-arguments-to-fields");
const { WorkflowLayout } = require("workflow-layout");
const { WorkflowWmTerminal } = require("workflow-wm-terminal");

const config = {
  presets: [
    "flow",
    "react",
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  plugins: ["transform-object-rest-spread", "transform-class-properties"]
};

module.exports = {
  config = {
    resolvers: [
      new WorkflowResolverAbsolute(),
      new WorkflowResolverRelative({path: process.cwd()}),
      new WorkflowResolverRelative({path: join(__dirname, "flows")})
    ],
    loader: new WorkflowLoaderBabel({config}),
    argumentParser: new WorkflowParserArguments(),
    transformers: [new WorkflowTransformerApplyArgumentsToFields()],
    layout: new WorkflowLayout(),
    wm: new WorkflowWmTerminal()
  }
};

```

The `workflow` command will execute a `kexec` command which replaces the 
node process with the `tmux` process.

The session name for the `tmux` session is set by `sessionName` parameter provided to the `Tmux` node 
in the `flow` file. 

```js
// ...

export const flow = render(
  <Workspace>
    <Tmux sessionName={"session-name"}>...</Tmux>
  </Workspace>
);


```


## Demo

Note you will need to run `yarn build` from the root before executing the example.

Try it with: `yarn TmuxExample`

![Demo](github/tmux.gif)
