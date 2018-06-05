const emptyNode = {
  type: "empty",
  swallows: [{class: "Empty Workflow Node"}]
}

function createEmptyNode({type, percent, swallows}) {
  return {type, percent, swallows};
}

function createAppNode({percent, xClass}) {
  return {
    percent,
    swallows: [{ class: `^${xClass}$` }],
  };
}

function findAllApps(root) {
  const apps = [];

  const nodes = [root];

  while (nodes.length) {
    const node = nodes.shift();
    if (node.type === "app") {
      apps.push(node);
    } else {
      for (const child of (node.children || [])) {
        nodes.push(child);
      }
    }
  }

  return apps;
}

function createFloatingNodes(node) {

  const apps = findAllApps(node);

  return apps.map(
    app => {
      const {left, top, width, height} = app.position;
      return {
        type: "floating_con",
        rect: {x: left, y: top, width, height },
        nodes: [ createAppNode(app) ]
      };
    }
  );
}

function createLayoutNode({ layout, percent, children }) {
  return { layout, percent, nodes: children };
}

function findAllFloating(tree) {
  const floating = [];

  const nodes = [tree];

  while (nodes.length) {
    const node = nodes.shift();
    if (node.type === "layout" && node.layout === "float") {
      floating.push(node);
    } else {
      for (const child of (node.children || [])) {
        nodes.push(child);
      }
    }
  }

  return floating;
}

function replaceAllFloatingWithEmpty(node) {
  const { layout, type } = node;

  if (type === "layout" && layout === "float") {
    return {
      ...emptyNode,
      percent: (node.percent || 1.0)
    };
  } else {
    const children = (node.children || []).map(replaceAllFloatingWithEmpty);
    return { ...node, children };
  }
}

function extractFloating(node) {
  if (!node.length) {
    return [
      replaceAllFloatingWithEmpty(node),
      ...findAllFloating(node)
    ];
  } else {
    return node.map(extractFloating)[0];
  }
}

function genLayout(node) {
  const {type, layout, percent } = node;
  if (type === "layout") {
    if (layout === "float") {
      return createFloatingNodes(node);
    } else {
      const children = node.children.map(genLayout);
      return createLayoutNode({ layout, percent, children });
    }
  } else if (type === "empty") {
    return createEmptyNode(node);
  } else {
    return createAppNode(node);
  }
}

export default function transform(node) {
  const nodes = extractFloating(node);

  const layouts = nodes.map(genLayout)
    .filter(({type}) => type !== "empty")
    .map(layout => layout.length ? layout : [layout]);

  const listOfLayouts = [].concat.apply([], layouts);
  return listOfLayouts;
}
