import run, { runWithConfig } from "./run";

import {resolve, alternatives} from "./resolver";
import {load} from "./loader";
import {transform} from "./transformer";
import {apply, screen} from "./wm";

export function init(config) {
  return {
    run: async (flow, args = [], context = {}) => {
      await runWithConfig(flow, args, context, config);
    },

    cli: async (context) => {
      await run(context, config);
    }
  };
}

export default run;

export function workflow({ resolvers, loader, argumentParser, transformers, layout, wm }) {
  return {
    resolve: async (path) => resolve(resolvers, path),
    alternatives: async (path) => alternatives(resolvers, path),
    load: async (path) => load(loader, path),
    parseArguments: async (flow, argv) => argumentParser.parse(flow, argv),
    transform: async (flow, args) => transform(transformers, flow, args),
    layout: async (flow, {screen}) => layout.layout(flow, {screen}),
    screen: async () => screen(wm),
    apply: async (flow) => apply(wm, flow)
  };
}
