// @flow

import type { NodeConfig } from '../index';

export type SplitVConfig = {
  percent: number,
  children: Array<NodeConfig>,
};

export function SplitV(config: SplitVConfig) : SplitVConfig {
  return { layout: 'splitv', ...config };
}

export type SplitHConfig = {
  percent: number,
  children: Array<NodeConfig>,
};

export function SplitH(config: SplitHConfig): SplitHConfig {
  return { layout: 'splith', ...config };
}
