import { resolve, alternatives } from './resolver';
import { load } from './loader';
import { transform } from './transformer';
import { apply, screen } from './wm';
import { register, unregister, update } from './node';

export function workflow({ resolvers, loaders, argumentParser, transformers, layout, server, wm }) {
  return {
    resolve: async path => resolve(resolvers, path),
    alternatives: async path => alternatives(resolvers, path),
    load: async path => load(loaders, path),
    parseArguments: async (flow, argv) => argumentParser.parse(flow, argv),
    transform: async (flow, args) => transform(transformers, flow, args),
    layout: async (flow, { screen }) => layout.layout(flow, { screen }),
    screen: async () => screen(wm),
    apply: async flow => apply(wm, flow),

    /* workflow-server */
    startServer: () => server.start(),
    register: app => register(app, server, wm),
    unregister: app => unregister(app, server, wm),
    update: (instance, oldProps, newProps) => update(instance, oldProps, newProps, server, wm),
  };
}
