var exec = require('child_process').exec;

class Npm {

  cwd(dir) {
    this.dir = dir;
    return this;
  }

  install(cb) {
    exec('npm i', {
      cwd: this.dir
    }, cb);

    return this;
  }

}

module.exports = new Npm();
