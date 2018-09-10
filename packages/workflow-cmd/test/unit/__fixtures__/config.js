/* eslint-env node */
/* eslint-disable no-console */

module.exports = {
  resolvers: [{ resolve: flow => flow }],
  loaders: [{ loader: { load: flow => JSON.parse(flow) } }],
  argumentParser: { parse: () => {} },
  transformers: [],
  layout: { layout: layout => layout },
  wm: { screen: () => {}, apply: flow => console.log(JSON.stringify(flow, null, 2)) },
};
