// @flow
import * as React from 'react';

import { Layout } from '../components';

type Props = {
  percent: number,
  children: React.Node,
};

export const SplitV = ({ percent, children }: Props) => (
  <Layout layout="splitv" percent={percent}>
    {children}
  </Layout>
);

export const SplitH = ({ percent, children }: Props) => (
  <Layout layout="splith" percent={percent}>
    {children}
  </Layout>
);
