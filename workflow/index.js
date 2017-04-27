import { NodeConfig } from './node';

import I3 from './wms/i3';

export type WorkspaceConfig = {
  name: string,
  args: string | Array<String>,
  root: NodeConfig,
};

const workflow = {
  apply: (config: WorkspaceConfig, args: mixed) => { // eslint-disable-line no-unused-vars
    const i3 = new I3();
    i3.apply(config);
  },
};

export default workflow;
