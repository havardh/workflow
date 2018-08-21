/* eslint-env node */
/* eslint-disable no-console */

const ncp = require('ncp').ncp;
const os = require('os');
const { resolve, sep } = require('path');
const existsSync = require('fs').existsSync;

let npm, platform;
try {
  npm = require('../dist/npm');
  platform = require('../dist/platform');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    console.warn('IF YOU ARE A USER and you see this message, then');
    console.warn('please report an issue at https://github.com/havardh/workflow/issues');

    console.warn();
    console.warn('Postinstall script will run only on a bundled package');
    console.warn('Run rollup in the root package create a bundle');
    process.exit(0);
  } else {
    throw error;
  }
}

const dev = process.env.WORKFLOW_DEV_MODE;
const homedir = process.env.WORKFLOW_HOME;

if (dev) {
  console.log('Running dev mode');
  console.log(' - home folder: ' + homedir);
}
const source = resolve(dev ? '../workflow-template' : 'template');
const destination = resolve(homedir || `${os.homedir()}/.workflow`);

if (existsSync(destination)) {
  try {
    const packageJson = require(destination + '/package.json');

    if (packageJson.name === 'workflow-user-home') {
      console.log('Workflow home directory found at: ' + destination);
      console.log('Update feature is not yet implemented');
      console.log();

      console.log(`Copying: ${source}/flows -> ${destination}/flows`);
      ncp(source + '/flows', destination + '/flows', { clobber: true }, err => {
        if (err) {
          return console.error(err);
        }
        console.log('All files copied');
      });
    } else {
      console.error('Invalid workflow home folder found at: ' + destination);
      console.error("Expected to find package.json with name='workflow-user-home'");
      console.error();
      process.exit(1);
    }
  } catch (e) {
    console.error('Invalid workflow home folder found at: ' + destination);
    console.error('Expected to find package.json');
    console.error();
    process.exit(2);
  }
} else {
  console.log('Installing workflow');
  console.log(' - cli tool (workflow)');
  console.log(` - home folder (${destination})`);
  console.log();

  const templates = ['config.js', 'package.json'];
  console.log(`Copying: ${source} -> ${destination}`);
  const filter = filename => {
    if (source === filename) {
      return true;
    }

    const name = filename
      .replace(source, '')
      .split(sep)[1]
      .replace(/^\./, '');

    if (templates.includes(name)) {
      return false;
    }

    console.log(filename, name, source);
    return true;
  };

  ncp(source, destination, { clobber: false, filter }, err => {
    if (err) {
      return console.error(err);
    }
    console.log('All files copied');

    console.log('Copy platform specific files');
    platform.write('config.js', { source, destination }, err => {
      if (err) {
        return console.error(err);
      }

      platform.write('package.json', { source, destination }, err => {
        if (err) {
          return console.error(err);
        }

        console.log('Running npm install');
        npm.cwd(destination).install(err => {
          if (err) {
            return console.error(err);
          }

          console.log(
            'Workflow should be ready for use. You can test it out with the following command:'
          );
          console.log();
          console.log('  workflow Example.js');
          console.log();
          console.log('If you experience any problems, please create an issue here:');
          console.log('  https://github.com/havardh/workflow/issues');
          console.log();
        });
      });
    });
  });
}
