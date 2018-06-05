// @Flow
/* eslint-env node */
import * as React from "react";
import {createComponent} from "workflow-react";

// eslint-disable global-require
export const Yoga = createComponent(require("./index").Yoga);

type Props = {
  children?: React.Node,
  style: any
};

export const Flex = ({style, children, ...props}: Props) => (
  <Yoga style={{...style, flex: 1}} {...props}>{children}</Yoga>
);
