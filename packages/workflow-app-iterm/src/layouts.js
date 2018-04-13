import React from "react";
import {Layout} from "workflow-react";

export const Horizontal = ({ children }) => (
  <Layout layout="horizontal" >{children}</Layout>
);

export const Vertical = ({ children }) => (
  <Layout layout="vertical" >{children}</Layout>
);