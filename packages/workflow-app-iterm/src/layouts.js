/* @flow */
import * as React from 'react';
import { Layout } from 'workflow-react';

export const Horizontal = ({ children }: { children: React.Node }) => (
  <Layout layout="horizontal">{children}</Layout>
);

export const Vertical = ({ children }: { children: React.Node }) => (
  <Layout layout="vertical">{children}</Layout>
);
