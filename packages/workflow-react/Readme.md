# React frontend for workflow

This module contains a [react](https://github.com/facebook/react) binding library for
writing workflow configuration files. The example below shows how to configure
a 50-50 split between a text editor and a browser.

```
import React from 'react';
import { render, Workspace } from 'workflow-react';

const { SplitH } = requireComponent("workflow-layout-tiled");
const { TextEditor, Browser } = requireComponent("workflow-apps-defaults");

export const flow = render(
  <Workspace name={'workflow-react-example'}>
    <SplitH percent={1}>
      <TextEditor percent={0.5} file={__filename} />
      <Browser percent={0.5} url={'https://google.com'} />
    </SplitH>
  </Workspace>,
);
```

## Api

The `workflow-react` package exports four distinct concepts.

 - The `render` function
 - `Components` - `Workspace`, `Layout`, `App`, `Async`
 - The `createComponent` `Component` factory function
 - The `requireComponent` utility function

### The `render` function

The render function is used to transform a React application into a
workflow definition. The return value of this function can be used as the `default`
export of a `flow`, as shown in the example above.

Example
```
import { render } from "workflow-react";

export const flow = render(...);
```

### Low Level `Components`

`workflow-react` exports three low level `Components` to build more complex
`React` components with. They are analogous to the `div`, `span` etc found in
`react-dom` and `Text`, `View` found in `react-native`.

If you are reading this document and do not intent to develop your own `Layout`
and `App` definitions, then you can skip the section covering those topics.

#### `Workspace`

The `Workspace` component is the top level component in a `workflow-react` flow.
It is a container which holds the flow and defines the name of the flow and the
list of command line arguments the flow accepts. The command line arguments are
passed to each app after the flow configuration has been translated into a
`workflow` configuration.

Definition
```
<Workspace
  name={<name of the workspace>}
  args={[<list of command line arguments>] | <name of single argument>}
>
  <children>
</Workspace>
```

Example
```
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { TextEditor } = requireComponent("workflow-apps-defaults");

export const flow = render(
  <Workspace
    name={'editor'}
    args={"file"}
  >
    <TextEditor percent={0.5} file={({file}) => file} />
  </Workspace>,
);
```

Notice that the `file` property on the `TextEditor` takes a function. This
function is passed an object containing all the named command line arguments.
This is not a feature of `workflow-react`, but is available when the 
[`workflow-transformer-apply-arguments-to-fields`](../workflow-transformer-apply-arguments-to-fields) 
is used in the `workflow` configuration.
The function passes the name of the file to the `TextEditor`.

Usage
```
workflow <name of flow file> /path/to/file
```

#### `Layout`

The `Layout` component is used to group `App` and other `Layout` components
together to be able to tell `workflow` how the Applications should be placed on
the screen.

`workflow` only supports tiling layouts by default and flexbox layouts when using
the [`workflow-layout-yoga`](../workflow-layout-yoga) package.

Definition
```
<Layout
  layout={"splith" | "splitv"}
  percent={<number in range 0.0-1.0>}
>
  <children>
</Layout>
```

Example
```
import React from 'react';
import { render, Workspace, Layout, requireComponent } from 'workflow-react';

const { TextEditor, Terminal } = requireComponent("workflow-apps-defaults");

export const flow = render(
  <Workspace name={'editor'}>
    <Layout
      layout={"splitv"}
      percent={1}
    >
      <TextEditor percent={0.5} />
      <Layout
        layout={"splith"}
        percent={0.5}
      >
        <Terminal percent={0.5} />
        <Terminal percent={0.5} />
      </Layout>
    </Layout>
  </Workspace>,
);
```

Usage
```
workflow <name of flow file>
```

#### `App`

The `App` component is used to generate an app definition. These are the only
`Components` which actually consumes space on the screen. To describe the `App`
component we need to go into some of the implementation details of `workflow`.
We need to know how `workflow` opens and communicates with the applications.
Now these details does depend on the underlying windows manager, but we can
generalize some concepts.

`workflow` will 1) open applications, 2) pass arguments to the applications and
3) tell the window manager how to position the application on the screen.

The details we need to be concerned with here are the two first. In the simplest
form, both of these are a command line call to the application. This call will
return the PID of the opened program and `workflow` will handle the rest.
However, not all programs expose a sufficient command line interface. For the
more complex cases we need to resort to platform or application specific
scripting.

Note: i3 uses the `xClass` property for applying the layout. This can be found
with the `xprop` command.

Definition
```
<App
  params=[<list of parameters>]
  xClass={<x window class>}
  name={<display name of the application}
  <prop-name>={<function(args)>}
  open={<function returning a command> | <platform specific object>}
/>
```

Example
```
import React from 'react';
import { render, Workspace, App } from 'workflow-react';

export const flow = render(
  <Workspace name={'editor'} >
    <App
      params={['file']}
      xClass="Atom"
      open={({file}) => `atom -n ${file}`}
    >
  </Workspace>,
);
```

Usage
```
workflow <name of flow file> /path/to/file
```

### Async

The `Async` component is used to load a node as asynchronous. This means that
the internals of the node can be loaded async. Using the `Async` requires that
the [`workflow-transformer-async`](../workflow-transformer-async) is used. 

Definition
```
<Async
  loader={async function which returns a node}
/>
```

Example
```
import React from 'react';
import { render, Workspace, App } from 'workflow-react';

async function defaultApp() {
  // returns a default app node async
}

export const flow = render(
  <Workspace name={'editor'} >
    <Async
      loader={async (props) => ({ ...await defaultApp(), ...props})}
    >
  </Workspace>,
);
```

## The `createComponent` function

The `createComponent` function is a factory function which takes an object
definition of an application and creates a `React` `Component` for the
application. It can be used to easily provide both the `workflow-core` compliant
object definition and the `workflow-react` `Component` for third party
application definitions. However, this function is not mandatory to use to
provide a `React` `Component`. The `App` can easily be used directly.

Example
```
import React from "react";
import { render, Workspace, createComponent} from "workflow-react";

const Intellij = {
  params: ["file"],
  open: ({file}) => `intellij ${file}`,
  xClass: "netbrains-intellij"
};

const IntellijComponent = createComponent(Intellij);

export const flow = render(
  <Workspace
    name={'intellij'}
    args={"file"}
  >
    <Intellij percent={0.5} file={({file}) => file} />
  </Workspace>,
);
```

## The `requireComponent` function

The `requireComponent` function will let you require a package containing a 
app or layout definition as a react component. The function uses `createComponent`
internally to convert the definition to a component. It can both require a single
definition and a collection of definitions.

```
import React from "react";
import { render, Workspace, requireComponent} from "workflow-react";

const {SplitV} = requireComponent("workflow-layout-tiled");
const Emacs = requireComponent("workflow-app-emacs");
const {Terminal, Browser} = requireComponent("workflow-apps-defaults");

export const flow = render(
  <Workspace
    name={'intellij'}
    args={"file"}
  >
    <SplitV percent={1.0}>
      <Emacs percent={0.5} />
      <Terminal percent={0.25} />
      <Browser percent={0.25} />
    </SplitV>
  </Workspace>,
);
```
