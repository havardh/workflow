// @Flow
import * as React from 'react';
import { Workspace, App, Layout } from './components';

export function createAppComponent(app) {
  const { xClass, name } = app;
  return class extends React.Component {
    static displayName = `app-${xClass || name}`;

    render() {
      return <App {...app} {...this.props} />;
    }
  };
}

type Props = {
  children?: React.Node,
};

export function createLayoutComponent(layout) {
  const name = ({ layout, customName }) =>
    typeof layout === 'string' ? layout : customName || 'custom';
  return class extends React.Component<Props> {
    static displayName = `layout-${name(layout)}`;

    render() {
      return (
        <Layout {...layout} {...this.props}>
          {this.props.children}
        </Layout>
      );
    }
  };
}

export function createWorkspaceComponent(workspace) {
  return class extends React.Component<Props> {
    static displayName = `workspace-${workspace.name || 'unknown'}`;

    render() {
      return (
        <Workspace {...workspace} {...this.props}>
          {this.props.children}
        </Workspace>
      );
    }
  };
}

export default function createComponent(node) {
  if (node.type === 'app') {
    return createAppComponent(node);
  } else if (node.type === 'layout') {
    return createLayoutComponent(node);
  } else if (node.type === 'workspace') {
    return createWorkspaceComponent(node);
  } else {
    throw new Error(`Could not create component for node '${JSON.stringify(node)}'`);
  }
}
