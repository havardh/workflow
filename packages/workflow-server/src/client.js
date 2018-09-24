/* eslint-env node */
/* eslint-disable no-console */
import spawn from 'cross-spawn';
import { join } from 'path';
import fs from 'fs';
import ipc from 'node-ipc';

ipc.config.id = 'workflow-server';
ipc.config.retry = 1000;
ipc.config.maxRetries = 5;

export function isRunning() {
  return fs.existsSync('/tmp/workflow-server.lock');
}

export async function start(node, cmd, args) {
  console.log('starting server');
  var env = Object.create(process.env);
  try {
    const out = fs.openSync(
      join(__dirname, '..', '..', 'workflow-home-example', 'stdout.log'),
      'a'
    );
    const err = fs.openSync(
      join(__dirname, '..', '..', 'workflow-home-example', 'stderr.log'),
      'a'
    );

    const subprocess = spawn('node', ['--inspect', join(__dirname, '..', 'apply.js')], {
      detached: true,
      stdio: ['ignore', out, err],
      //stdio: ['inherit'],
      env: env,
    });

    subprocess.unref();

    console.log('server started');
  } catch (e) {
    console.error(e);
  }
}

export async function apply(path, args) {
  ipc.connectToNet('workflow-server', () => {
    const server = ipc.of['workflow-server'];

    server.on('connect', () => {
      server.emit('workflow.apply', JSON.stringify({ path, args }));

      ipc.disconnect('workflow-server');
    });
  });
}
