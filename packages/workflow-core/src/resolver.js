/* eslint-env node */
export async function resolve(resolvers, path, { args }) {
  const errors = [];
  for (let resolver of resolvers) {
    try {
      return await resolver.resolve(path, { args });
    } catch (e) {
      errors.push(e);
    }
  }

  for (const error of errors) {
    console.error(error); // eslint-disable-line no-console
  }
  throw new Error(`Could not resolve ${path}`);
}

export async function alternatives(resolvers, path, { args }) {
  const all = [];

  for (let resolver of resolvers) {
    all.push(resolver.alternatives(path, { args }));
  }

  return all;
}
