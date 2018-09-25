/* eslint-env node */
/* eslint-disable no-console */
import yargs from 'yargs';

import { args } from 'shared/args';

import { resolveFlow, apply } from './commands/apply';
import { version } from './commands/version';
import { update } from './commands/update';

const { positional } = args(process.argv);

const commands = ['update', 'version', 'help', 'apply'];

const isApplyWithFlow = ([command, path]) => command === 'apply' && path;
const isImplicitApplyWithFlow = ([command]) => !!command && !commands.includes(command);

(async function exec() {
  let flow, path;
  try {
    if (isApplyWithFlow(positional)) {
      path = positional[1];
    } else if (isImplicitApplyWithFlow(positional)) {
      path = positional[0];
    }
    flow = await resolveFlow(path);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  yargs
    .scriptName('workflow')
    .usage('$0 [<cmd>]')
    .command('version', 'Show the version', () => {}, version)
    .command(
      'update',
      'Update workflow and workflow-home dependencies',
      yargs =>
        yargs
          .option('latest', {
            type: 'boolean',
            description: 'Updates dependencies in workflow-home to @latest',
          })
          .option('force', {
            type: 'boolean',
            description: 'Ignore uncommited check when updating workflow-home',
          }),
      update
    )
    .command(
      ['apply <flow>' + positionalArguments(flow), '* <flow>' + positionalArguments(flow)],
      'apply the flow',
      yargs => buildFlowArgs(yargs, flow),
      async args => apply(path, args)
    )
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'Set the workflow-home by path to config.js',
    })
    .option('server', {
      alias: 's',
      type: 'boolean',
      description: 'Run workflow in server mode',
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
