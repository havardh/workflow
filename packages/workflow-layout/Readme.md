# The Workflow Layout Package

The purpose of the layout package is to decouple the interface for
writing layouts and implementing windows manager adapters.
This package takes a flow defined in the form of an abstract flow tree (`AFT`) and transform it into
a concrete flow tree (CFT). The `CFT` is the common interface which is
supported by all windows manager adapter, while an `AFT` is more expressive
and eases writing layouts.

This package is replaceable as long as the replacement produces a
tree which adheres to the rules of the `CFT`. 


## Usage
```
const { WorkflowLayout } = require("workflow-layout");

cont workflow = require("workflow-core").workflow({
  layout: new WorkflowLayout(),
  ...
});

const screen = { top: 0, left: 0, width: 1024, height: 768 };

const cft = workflow.layout(aft, {screen});
```

## The Abstract Flow Tree

The abstract flow tree consists of three types of nodes. The root node is
a `workspace` node, it can contain one or more `layout` nodes as children, or
a single `app` node. Each of the `layout` nodes can contain one or more `layout` or `app` nodes. The `app`
nodes are the leaf nodes, they are free to contain child nodes, but these
are not managed by the `layout` package.

The notable differences between the nodes in the `AFT` and the `CFT` are the `custom`, `relative`, and `absolute` layout nodes. The
`absolute` and `relative` nodes are for absolute and relative positioning
respectively and are translated into `float` nodes in the `CFT`. The
`custom` is used to implement layout abstractions. See `workflow-layout-yoga`
for an example of using the `custom` node to support css `Flexbox` using
Yoga. All `custom` nodes implement a function which returns a sub-tree with
nodes adhering to the rules of the `AFT`. The `AFT` is recursively evaluated
to generate a valid `CFT`.

```
const workspace = {
  type: "workspace",
  children: fill | app | splith | splitv | [ absolute ],
}

const custom = {
  type: "layout",
  layout: () => fill | splith | splitv | relative | absolute
}

const fill = {
  type: "layout",
  layout: "fill",
  percent: 1.0, // If parent is splith | splitv
  children: [ splith | splitv | custom | *relative | app, *absolute ]
};

const splith = {
  type: "layout",
  layout: "splith",
  percent: 1.0, // If parent is splith | splitv
  children: [ *(splith{percent} | splitv{percent} | fill{percent} | app{percent} | custom{percent}), *absolute ], // sum(percent) === 1
};

const splitv = {
  type: "layout",
  layout: "splitv",
  percent: 1.0, // If parent is splith | splitv
  children: [ *(splith{percent} | splitv{percent} | fill{percent} | app{percent} | custom{percent}), *absolute ], // sum(percent) === 1
};

const relative = {
  type: "layout",
  layout: "relative",
  position: { top: 0, left: 0, width: 100, height: 100 }, // relative to parent
  children: [ fill | app | split | splitv | custom, *absolute ],
};

const absolute = {
  type: "layout",
  layout: "absolute",
  percent: 1.0, // If parent is splith | splitv
  position: { top: 0, left: 0, width: 100, height: 100 } // relative to workspace
  children: [ fill | app | split | splitv | custom, *absolute ],
};

const app = {
  type: "app",
  open: <>,
  percent: 1.0, // If parent is splith | splitv
  children: [<>],
}
```

## The Concrete Flow Tree

All nodes in the concrete flow tree contains the absolute position of the
node on the screen.

```
const workspace = {
  type: "workspace",
  position: { top, left, width, height }, // absolute
  children: [ fill | app | splith | splitv, *float ],
}

const fill = {
  type: "layout",
  layout: "fill",
  percent: 1.0, // If parent is splith | splitv
  position: { top, left, width, height }, // absolute
  children: [ splith | splitv | *float | app ]
};

const splith = {
  type: "layout",
  layout: "splith",
  percent: 1.0, // If parent is splith | splitv
  position: { top, left, width, height }, // absolute
  children: [ *(splith{percent} | splitv{percent} | fill{percent} | app{percent}) ], // sum(percent) === 1
};

const splitv = {
  type: "layout",
  layout: "splitv",
  percent: 1.0, // If parent is splith | splitv
  position: { top, left, width, height }, // absolute
  children: [ *(splith{percent} | splitv{percent} | fill{percent} | app{percent}) ], // sum(percent) === 1
};

const float = {
  type: "layout",
  layout: "float",
  percent: 1.0, // If parent is splith | splitv,
  position: { top, left, width, height } // absolute
  children: [ fill | app | splith | splitv ],
};

const app = {
  type: "app",
  open: <>
  percent: 1.0, // If parent is splith | splitv,
  position: { top, left, width, height } // absolute
  children: [<>],
}
```
