import React from 'react';

import { Layout } from '..';

export const SplitV = ({ percent, children }) => (
  <Layout percent={percent} layout="splitv">{children}</Layout>
);

export const SplitH = ({ percent, children }) => (
  <Layout percent={percent} layout="splith">{children}</Layout>
);
