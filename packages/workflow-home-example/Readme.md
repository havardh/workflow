# Workflow home folder

This folder is your personal configuration of workflow. In it you can override
defaults and contain your own `flow` filess. This folder has been initialized by
the `create-workflow-home` initializer. To make workflow use this folder it must
either be located on the default path `~/.workflow` or you can set the value of
the `WORKFLOW_HOME` environment variable to point to it.

The `workflow` command can be used globally to execute workflows defined in the
`/flows` folder. To executed the example workflow run the following command from
any folder on your computer.

```
workflow Example.js
```

## Files and Folders

The initial layout of the `workflow` home folder is here described. You
are free to modify it to your liking. The only **required** file in this
folder is the `config.js` file which is read by the `workflow` command.

### `apps/`
A folder for specifying your default apps and any applications definitions that
you do not find in the `workflow` repository.

#### `apps/defaults.js`
Workflow specifies platform independent default apps to make it possible to
write platform independent workflows. These are currently `TextEditor`,
`Terminal` and `Browser`. Edit the contents of this file to set these defaults
to your linking. They will be exposed throw the `workflow-apps-defaults` package.

#### `apps/user.js`
This is not a special files, it is more of a convention. Here you can add `app`
definitions that do you do not find in the `workflow` repository. If you feel
the need to add apps here you should consider filing an issue or a pull request
so that we can include the `app` definition in the main `workflow` repository.

### `flows/`
The folder which `workflow` will try to resolve workflows relative to. The path
to this folder is specified in the `config.js` file.

#### `flows/Example.js`
An example of a workflow definition file.

#### `flows/ReactExample.js`
An example of a workflow definition file using the `workflow-react` package.

### `node_modules/`
The installed node modules as dependent on by the `package.json` file.

### `config.js`
This file contains the configuration of `workflow`. It is read when executing
`workflow`. The default export of this file is documented in the code example
below.

`workflow-core` does not enforce an order of excution of the configured parts.
However, for simplicity we will assume you are using `workflow-cmd` and in particular
the [`exec`](https://github.com/havardh/workflow/blob/220805e61bc1deaaae44cac313edf9d7b720630f/packages/workflow-cmd/src/index.js#L20)
function. This function will call each of the phases described below in order.
The result of the first phase will be passed into the next phase and so on.

```javascript
module.exports = {

  // A resolver translates a name into an absolute path to a flow file.
  // The defaults are workflow-resolver-relative and *-absolute.
  // Conflicts when multiple resolvers provide a valid path is resolved
  // by the order they appear in this list.
  resolvers: [
    new WorkflowResolverAbsolute(),
    new WorkflowResolverRelative({ path: "/path/to/resolve/relative/to" })
  ],

  // A loader takes the absolute path from a resolver and load the flow from
  // the specified file. The optional filter function can be used to specify
  // when the loader should be used. The example below shows how to only run
  // babel on files with js or jsx extensions
  loaders: [{
    loader: new WorkflowLoaderBabel({/* babel configuration */*}),
    filter: path => path.match(/\.jsx?$/)
  }],

  // The arguments parser will translate the command line arguments into
  // data structure which is passed to the transformers, layout and wm.
  argumentParser: new WorkflowParserArguments(),

  // A transformer reads the flow and the arguments data structure.
  // It is free to modify the flow return the results. The input flow
  // will be passed through all the transformers in turn.
  transformers: [new WorkflowTransformerApplyArgumentsToFields()],

  // The layouts pass is responsible for translating the input flow into
  // the strict format that all wm implementations supports. This means that
  // up untill this point you are free to define a flow format, as long as
  // you use a layout pass here which translates it to the expected format.
  // See the workflow-layout Readme.md [1] for details.
  layout: new WorkflowLayout(),

  // The wm is the adapter to the underlying windows manager. This will communicate
  // with the windows manager and shell for your platform to open and position
  // applications on the screen
  wm: new WorkflowWmI3()
};
```

### `package.json`
Regular `npm` `package.json` file. You can install any packages here using
`npm` or `yarn` and use them in your `flow` files or `app` definitions.

### `Readme.md`
This file.

[1] [workflow-layout](https://github.com/havardh/workflow/tree/master/packages/workflow-layout)
