module.exports = (file, api, options) => {
  const j = api.jscodeshift;

  const root = j(file.source);

  // Rewrite workflow- imports to named
  // Before: import render from "workflow-react";
  // After: import {render} from "workflow-react";
  // Before import WorkflowWmI3 from "workflow-wm-i3";
  // After: import {WorkflowWmI3} form "workflow-wm-i3";
  root.find(j.ImportDeclaration).forEach(decl => {
    if (decl.value.source.value.startsWith('workflow-')) {
      decl.value.specifiers = decl.value.specifiers.map(specifier => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          return j.importSpecifier(j.identifier(specifier.local.name));
        } else {
          return specifier;
        }
      });
    }
  });

  // Rewrite require('workflow-*') to named exports
  root.find(j.CallExpression).forEach(expr => {
    if (expr.value.callee.name === 'require') {
      if (expr.value.arguments[0].value.startsWith('workflow-')) {
        if (expr.parentPath.value.id.type === 'Identifier') {
          const name = expr.parentPath.value.id.name;
          expr.parentPath.value.id = j.objectPattern([createSimpleProp(j, name)]);
        }
      }
    }
  });

  // Rewrite requireComponent to named exports
  root.find(j.CallExpression).forEach(expr => {
    if (expr.value.callee.name === 'requireComponent') {
      if (expr.parentPath.value.id.type === 'Identifier') {
        const name = expr.parentPath.value.id.name;
        expr.parentPath.value.id = j.objectPattern([createSimpleProp(j, name)]);
      }
    }
  });

  // Rewirte flow file export
  if (file.path.includes('flows')) {
    root
      .find(j.ExportDefaultDeclaration)
      .replaceWith(decl =>
        j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(j.identifier('flow'), decl.value.declaration),
          ])
        )
      );
  }

  if (file.path.endsWith('config.js')) {
    // Rewrite config file export
    root
      .find(j.ExportDefaultDeclaration)
      .replaceWith(decl =>
        j.exportNamedDeclaration(
          j.variableDeclaration('const', [
            j.variableDeclarator(j.identifier('config'), decl.value.declaration),
          ])
        )
      );

    // Rewrite config file module.exports
    root.find(j.AssignmentExpression).forEach(e => {
      if (e.value.left.object.name === 'module' && e.value.left.property.name === 'exports') {
        e.value.right = j.objectExpression([
          j.property('init', j.identifier('config'), e.value.right),
        ]);
      }
    });
  }

  return root.toSource();
};

function createSimpleProp(j, name) {
  const prop = j.property('init', j.identifier(name), j.identifier(name));
  prop.shorthand = true;
  return prop;
}
