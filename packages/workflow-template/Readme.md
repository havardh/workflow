# Workflow configuration folder

This folder is your personal configuration of workflow. In it you can override
defaults and contain your own flows. This folder has been initialized by the
`workflow-cmd` tool in the post install hook of running `npm i -g workflow-cmd`.

The `workflow` command can be used globally to execute workflows defined in the
`/flows` folder. To executed the example workflow run the following command from
any folder on your computer.

```
workflow Example.js
```

## Files and Folders

The initial layout of the `workflow` home folder is here described. You
are free to modify it to your liking. The only **required** file in this
folder is the `cli.js` file which is executed by the `workflow` command.

### `apps/`
A folder for specifying your default apps and any applications definitions that
you do not find in the `workflow` repository.

#### `apps/defaults.js`
Workflow specifies platform independent default apps to make it possible to
write platform independent workflows. These are currently `TextEditor`,
`Terminal` and `Browser`. Edit the contents of this file to set these defaults
to your linking.

#### `apps/user.js`
This is not a special files, it is more of a convention. Here you can add `app`
definitions that do you do not find in the `workflow` repository. If you feel
the need to add apps here you should consider filing an issue or a pull request
so that we can include the `app` definition in the main `workflow` repository.

### `cache/`
When a workflow is executed for the first time the transpiled version is stored
in this cache folder.

### `flows/`
The folder which `workflow` will try to resolve workflows relative to.

#### `flows/Example.js`
An example of a workflow definition file.

#### `flows/ReactExample.js`
An example of a workflow definition file using the `workflow-react` package.

### `node_modules/`
The installed node modules as dependent on by the `package.json` file.


### `cli.js`
The entry point into the `workflow` library as executed by the `workflow`
command.

### `package.json`
Regular `npm` `package.json` file. You can install any packages here using
`npm` or `yarn` and use them in your `workflows` or `app` definitions.


### `Readme.md`
This file.
