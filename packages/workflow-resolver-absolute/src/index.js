import fs from 'fs';
import { dirname, join, basename, resolve } from 'path';
import { promisify } from 'util';

export default class WorkflowResolverAbsolute {
  async alternatives(path) {
    try {
      const stat = await promisify(fs.stat)(path);
      if (stat.isFile()) {
        return [path];
      } else {
        const files = await promisify(fs.readdir)(path);

        return files.map(file => join(path, file));
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        try {
          const dir = dirname(path);
          const filePrefix = basename(path);
          const files = await promisify(fs.readdir)(dir);

          return files.filter(file => file.startsWith(filePrefix)).map(file => join(dir, file));
        } catch (e) {
          if (e.code === 'ENOENT') {
            return [];
          } else {
            throw e;
          }
        }
      }
      throw e;
    }
  }

  async resolve(path) {
    try {
      const stat = await promisify(fs.stat)(path);
      if (stat.isFile()) {
        return resolve(path);
      } else {
        throw new Error(`Path '${path}' is a directory`);
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        throw new Error(`Could not find file ${path}`);
      } else {
        throw e;
      }
    }
  }
}
