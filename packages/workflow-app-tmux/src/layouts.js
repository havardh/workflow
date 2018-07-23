import * as React from 'react';

import { Layout } from 'workflow-react';

const SplitH = ({ children }: { children: React.Node }) => (
  <Layout layout="splith">{children}</Layout>
);

const SplitV = ({ children }: { children: React.Node }) => (
  <Layout layout="splitv">{children}</Layout>
);

export { SplitH, SplitV };
