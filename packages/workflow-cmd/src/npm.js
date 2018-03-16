/* eslint-env node */
var spawn = require('child_process').spawn;

class Npm {

  cwd(dir) {
    this.dir = dir;
    return this;
  }

  install(cb) {
    const cmd = spawn('npm', ['i'], { stdio: "inherit", cwd: this.dir });
    cmd.on('close', () => cb(null));
    cmd.on('error', cb);

    return this;
  }

}

module.exports = new Npm();
