/* eslint-env node */
/* eslint-disable no-console */
import yargs from 'yargs';

import args from 'shared/args';

import { resolveFlow, apply } from './commands/apply';
import version from './commands/version';
import update from './commands/update';

const [command, path] = args(process.argv).positional;

const commands = ['update', 'version', 'help', 'apply'];

const isApplyWithFlow = (command, path) => command === 'apply' && path;
const isImplicitApplyWithFlow = command => !!command && !commands.includes(command);

(async function exec() {
  let flow;
  try {
    if (isApplyWithFlow(command, path)) {
      flow = await resolveFlow(path);
    } else if (isImplicitApplyWithFlow(command)) {
      flow = await resolveFlow(command);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  yargs
    .command('version', 'Show the version', () => {}, version)
    .command('update', 'Update workflow and workflow-home dependencies', () => {}, update)
    .command(
      ['apply <flow>' + positionalArguments(flow), '* <flow>' + positionalArguments(flow)],
      'apply the flow',
      yargs => buildFlowArgs(yargs, flow),
      async args => apply(flow, args)
    )
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'Set the workflow-home by path to config.js',
    })
    .option('verbose', {
      alias: 'vv',
      type: 'boolean',
      description: 'Set output mode to verbose',
    })
    .help()
    .parse();
})().catch(err => console.error(err));

function positionalArguments(flow) {
  let args = '';
  if (flow) {
    if (typeof flow.args === 'string') {
      args += ' <' + flow.args + '>';
    } else if (Array.isArray(flow.args)) {
      for (let arg of flow.args) {
        args += ' <' + arg + '>';
      }
    }
  }
  return args;
}

function buildFlowArgs(yargs, flow) {
  yargs.positional('flow', {
    type: 'string',
    describe: 'the flow file to load',
  });
  yargs.require('flow');
  if (!flow) {
    return;
  }

  if (typeof flow.args === 'string') {
    yargs.positional(flow.args, {
      type: 'string',
      describe: flow.args,
    });
    yargs.require(flow.args);
  } else if (Array.isArray(flow.args)) {
    for (let arg of flow.args) {
      yargs.positional(arg, { type: 'string', describe: arg });
      yargs.require(arg);
    }
  } else if (flow.args !== null && typeof flow.args === 'object') {
    for (let [key, value] of Object.entries(flow.args)) {
      yargs.option(key, { description: value });
      yargs.demandOption(key);
    }
  } else if (flow.args) {
    console.error('Misconfigured flow, unknown args property: ' + JSON.stringify(flow));
    process.exit(1);
  }
}
