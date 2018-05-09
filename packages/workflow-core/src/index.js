import run, { runWithConfig } from "./run";

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
