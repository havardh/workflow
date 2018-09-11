import { resolve, alternatives } from './resolver';
import { load } from './loader';
import { transform } from './transformer';
import { apply, screen } from './wm';

export function workflow({ resolvers, loaders, argumentParser, transformers, layout, wm }) {
  return {
    resolve: async (path, { args }) => resolve(resolvers, path, { args }),
    alternatives: async (path, { args }) => alternatives(resolvers, path, { args }),
    load: async (path, { args }) => load(loaders, path, { args }),
    parseArguments: async (flow, argv) => argumentParser.parse(flow, argv),
    transform: async (flow, { args }) => transform(transformers, flow, { args }),
    layout: async (flow, { screen, args }) => layout.layout(flow, { screen, args }),
    screen: async ({ args }) => screen(wm, { args }),
    apply: async (flow, { args }) => apply(wm, flow, { args }),
  };
}
