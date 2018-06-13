/* eslint-env node */
/* eslint-disable no-console */
import spawn from 'cross-spawn';
import { join } from 'path';
import * as Env from 'shared/env';

if (Env.dev) {
  console.log('Running in dev mode');
  console.log(`From: ${Env.baseFolder}`);
}

(function cli() {
  const [node, cmd, ...args] = process.argv; // eslint-disable-line no-unused-vars

  var env = Object.create(process.env);
  env.NODE_PATH = `${Env.baseFolder}/node_modules`;
  spawn(join(__dirname, '..', 'index.js'), args, { stdio: 'inherit', env: env });
})();
