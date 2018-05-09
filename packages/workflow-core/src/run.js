/* eslint-disable no-console */
/* eslint-env node */
import parseArgs from './parser/args';
import transform from "./transform/index";

export default async function run(context, config) {
  const [node, index, configFile, ...args] = process.argv; // eslint-disable-line no-unused-vars
  await runWithConfig(configFile, args, context, config); // eslint-disable-line no-use-before-define
}

async function resolve(resolvers, path) {
  const errors = [];
  for (let resolver of resolvers) {
    try {
      return await resolver.resolve(path);
    } catch (e) {
      errors.push(e);
    }
  }

  for (const error of errors) {
    console.error(error);
  }
  throw new Error(`Could not resolve ${path}`);
}

async function applyTransforms(transforms, config, {args}) {
  let tree = config;

  for (let transformer of transforms) {
    tree = await transform(tree, transformer, args);
  }
  return tree;
}

export async function runWithConfig(
  path,
  args,
  context,
  { resolvers, loader, transformers, wm }
) {
  try {
    const flow = await resolve(resolvers, path);
    const config = (await loader.load(flow)).default;
    const parameters = parseArgs(config.args, args);
    const layout = await applyTransforms(transformers, config, {args: parameters});
    await wm.apply(layout);
  } catch (error) {
    console.error(`Failed to load ${JSON.stringify(path)}`)
    if (process.env.NODE_ENV === 'production') {
      console.error(String(error));
    } else {
      console.error(error.stack);
      throw error.stack;
    }
    process.exit(1);
  }
}
