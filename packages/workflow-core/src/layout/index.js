// @flow

import type { NodeConfig } from '../index';

export type SplitVConfig = {
  type: "layout",
  percent: number,
  children: Array<NodeConfig>,
};

export function SplitV(config: SplitVConfig) : SplitVConfig {
  return { type: "layout", layout: 'splitv', ...config };
}

export type SplitHConfig = {
  percent: number,
  children: Array<NodeConfig>,
};

export function SplitH(config: SplitHConfig): SplitHConfig {
  return { type: "layout", layout: 'splith', ...config };
}
