export async function load(loaders, path) {
  for (let { loader, test } of loaders) {
    if (path.match(test)) {
      return loader.load(path);
    }
  }

  throw new Error('Could not load path: ' + path);
}
