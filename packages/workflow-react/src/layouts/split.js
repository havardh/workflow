// @flow
import * as React from 'react';

import { Layout } from '..';

type Props = {
  percent: number,
  children: React.Node
}

export const SplitV = ({ percent, children }: Props) => (
  <Layout percent={percent} layout="splitv">{children}</Layout>
);

export const SplitH = ({ percent, children }: Props) => (
  <Layout percent={percent} layout="splith">{children}</Layout>
);
