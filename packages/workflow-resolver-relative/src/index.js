import fs from "fs";
import {dirname, basename, join, isAbsolute, resolve} from "path";
import {promisify} from "util";
import {debug, error} from "shared/logger";

export default class WorkflolwResolverRelative {

  constructor({path, filter}) {
    if (!isAbsolute(path)) {
      error("WorkflowResolverRelative failed to initialize, must be given an absolute path. Given " + path);
      throw Error();
    }

    this.path = path;
    this.filter = filter;
  }

  async alternatives(path) {
    debug(`WorkflolwResolverRelative.path(${path})`);
    try {
      const files = await promisify(fs.readdir)(join(this.path, path))

      if (path) {
        debug("- resolving path relative to resolver");

        return files
          .map(file => join(path, file))
          .filter(file => file.match(this.filter));
      } else {
        debug("- resolving files in root of resolver");
        return files.filter(file => file.match(this.filter));
      }
    } catch (e) {
      if (e.code === "ENOENT") {
        debug(`Given parameter is not a directory ${join(this.path, path)}`)
        try {
          const dir = dirname(join(this.path, path));
          const filePrefix = basename(path);
          const files = await promisify(fs.readdir)(dir);

          debug("- resolving files filtered by prefix");
          debug(` directory: ${resolve(path)}`);
          debug(` filter: ${filePrefix}`);
          return files
            .filter(file => file.startsWith(filePrefix))
            .filter(file => file.match(this.filter))
            .map(file => dirname(path) === "." ? file : join(dirname(path), file));

        } catch (e) {
          if (e.code === "ENOENT") {
            return [];
          } else {
            throw e;
          }
        }
      } else {
        throw e;
      }
    }
  }

  async resolve(path) {
    if (this.filter && !path.match(this.filter)) {
      throw Error(`Path '${path}' does not match pattern '${this.filter}'`);
    }

    try {
      const stat = await promisify(fs.stat)(join(this.path, path));
      if (stat.isFile()) {
        return join(this.path, path);
      } else {
        throw new Error("");
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        throw new Error(`Could not resolve '${path}' relative to ${this.path}`, e);
      } else {
        throw e;
      }
    }
  }
}
