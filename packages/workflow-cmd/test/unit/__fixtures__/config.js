/* eslint-env node */
/* eslint-disable no-console */

module.exports = {
  config: {
    resolvers: [{ resolve: flow => flow }],
    loaders: [
      {
        loader: {
          load: flow => ({
            flow: JSON.parse(flow),
          }),
        },
      },
    ],
    argumentParser: { parse: () => {} },
    transformers: [],
    layout: { layout: layout => layout },
    wm: { screen: () => {}, apply: flow => console.log(JSON.stringify(flow, null, 2)) },
  },
};
