/* eslint-env node */

module.exports = class WorkflowLayout {
  layout(node, { screen }) {
    return calculate(node, { position: screen, screen });
  }
};

function calculateWorkspace(workspace, { position, screen }) {
  const children = workspace.root ? [workspace.root] : workspace.children;

  return {
    ...workspace,
    position,
    children: workspace.children && children.map(child => calculate(child, { position, screen })),
    root: workspace.root && children.map(child => calculate(child, { position, screen })),
  };
}

function calculateApp(app, { position }) {
  return { ...app, position };
}

function calculateLayout(layout, { position, screen }) {
  if (typeof layout.layout === 'function') {
    const newLayout = layout.layout(layout, { position, screen });
    return calculate(newLayout, { position, screen });
  }

  const { left, top, width, height } = position;
  switch (layout.layout) {
    case 'fill': {
      const [child] = layout.children;
      return { ...layout, position, children: [calculate(child, { position, screen })] };
    }
    case 'splitv': {
      let startTop = top;
      return {
        ...layout,
        position,
        children: layout.children.map(child => {
          const currentStartTop = startTop;
          startTop += height * child.percent;
          const position = { left, top: currentStartTop, height: height * child.percent, width };
          return calculate(child, { position, screen });
        }),
      };
    }
    case 'splith': {
      let startLeft = left;
      return {
        ...layout,
        position,
        children: layout.children.map(child => {
          const currentStartLeft = startLeft;
          startLeft += width * child.percent;

          const position = { left: currentStartLeft, top, height, width: child.percent * width };
          return calculate(child, { position, screen });
        }),
      };
    }
    case 'relative': {
      const position = {
        left: left + layout.position.left,
        top: top + layout.position.top,
        width: layout.position.width,
        height: layout.position.height,
      };
      return {
        ...layout,
        layout: 'float',
        position,
        children: layout.children.map(child => calculate(child, { position, screen })),
      };
    }
    case 'absolute': {
      const { position } = layout;

      return {
        ...layout,
        layout: 'float',
        children: layout.children.map(child => calculate(child, { position, screen })),
      };
    }
    default: {
      throw new Error({ msg: `Unreconized layout: ${layout.layout}` });
    }
  }
}

function calculate(node, { position, screen }) {
  switch (node.type) {
    case 'workspace':
      return calculateWorkspace(node, { position, screen });
    case 'layout':
      return calculateLayout(node, { position, screen });
    case 'app':
      return calculateApp(node, { position, screen });
    default:
      throw new Error(`Unrecognized node type: '${JSON.stringify(node)}'`);
  }
}
