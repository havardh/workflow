# Workflow

A declarative virtual windows manager with an optional React frontend and experimental Angular frontend.

## What does it do?

Workflow turns declarative windows layouts defined in javascript files ...

```javascript
export default render(
  <Workspace name={'workflow-react-example'}>
    <SplitH percent={1}>
      <TextEditor percent={0.5} file={__filename} />
      <Browser
        percent={0.5}
        url={'https://github.com/havardh/workflow/tree/master/packages/workflow-cmd'}
      />
    </SplitH>
  </Workspace>,
);
```


... into open applications populated with arguments in the specified layout on the screen.

![](github/readme-example.png)

## Usage

Workflow is a command line tool written for node.

Installing it globally with `npm` will set up the `workflow` command and initialize a home directory
at `~/.workflow`.
```bash
npm install --global workflow-cmd
```

Running the command will by default resolve flow files relative to `~/.workflow/flows` or by
an absolute path.
```bash
workflow Example.js # resolves to ~/.workflow/flows/Example.js
workflow /path/to/file.js # resolves the file directly
```

## Cross platform

Workflow is written in a modular way to allow for extension. There are currently experimental support
for [osx](packages/workflow-wm-osx), [windows](packages/workflow-wm-windows), and linux using 
[i3](packages/workflow-wm-i3) or [wmctrl](packages/workflow-wm-wmctrl).

## Devlopment

The [`cli.js`](packages/workflow-cmd/cli.js) can be executed in development mode. By default,
it will use [`workflow-template`](packages/workflow-template) the home directory. 
Development mode is activated by setting the environment variable `WORKFLOW_DEV_MODE` to `true`.

```bash
yarn // setup all dependencies. 

WORKFLOW_DEV_MODE=true ./packages/workflow-cmd/cli.js ./packages/workflow-template/flows/Example.js
```

Note: the flow is resolved with the absolute resolver in the development mode example. This is because
the path for the relative resolver is currently not set up correctly in development mode. 
