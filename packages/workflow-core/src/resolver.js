/* eslint-env node */
export async function resolve(resolvers, path) {
  const errors = [];
  for (let resolver of resolvers) {
    try {
      return await resolver.resolve(path);
    } catch (e) {
      errors.push(e);
    }
  }

  for (const error of errors) {
    console.error(error); // eslint-disable-line no-console
  }
  throw new Error(`Could not resolve ${path}`);
}

export async function alternatives(resolvers, path) {
  const all = [];

  for (let resolver of resolvers) {
    all.push(resolver.alternatives(path));
  }

  return all;
}
