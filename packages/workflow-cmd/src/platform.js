/* eslint-env node */
/* eslint-disable no-console */
const {platform, wm} = require("shared/env");
const {basename, extname, join} = require("path");
const ncp = require('ncp');

class Platform {

  write(file, {source, destination}, cb) {

    const ext = extname(file);
    const name = basename(file).replace(ext, "");

    const from = join(source, "." + file, `${name}.${platform}-${wm}${ext}`);
    const to = join(destination, file);

    console.log(`Write platform file: ${to}`);
    console.log(`- Copy ${from} -> ${to}`);

    ncp(from, to, {clobber: true}, cb);

    return this;
  }

}

module.exports = new Platform();
