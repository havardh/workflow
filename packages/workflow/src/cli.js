/* eslint-env node */
/* eslint-disable no-unused-vars, no-console */

import prompt from 'prompt';
import spawn from 'cross-spawn';
import { resolve, join } from 'path';
import * as WorkflowCmd from 'workflow-cmd/cli';
import { promisify } from 'util';
import os from 'os';
import execa from 'execa';

import { dev, homedir, devhomedir, baseFolder } from 'shared/env';
import { isValidWorkflowHome } from 'shared/homefolder';

(async function cli([node, cmd, ...args]) {
  if (!isValidWorkflowHome(baseFolder)) {
    await initWorkflowHome(baseFolder);
  }

  WorkflowCmd.cli(node, cmd, args);
})(process.argv).catch(err => console.error(err.toString()));

async function initWorkflowHome(path) {
  console.log();
  console.log('It looks like you are using workflow for the first time.');
  console.log();
  console.log('Workflow requires a workflow-home directory.');
  console.log('The workflow-home directory defaults to ' + join(os.homedir(), '.workflow'));
  console.log('The default location can be overriden by the environment variable WORKFLOW_HOME');
  console.log();
  if (homedir) {
    console.log('You have overriden the location to be:', resolve(homedir));
    console.log();
  }
  if (devhomedir) {
    console.log('You have overriden the dev location to be:', resolve(devhomedir));
    console.log();
  }

  if (
    await promptYesNo('Would you like to initialize a workflow-home directory at: ' + resolve(path))
  ) {
    if (dev) {
      await execa('node', ['../create-workflow-home/index.js', path], {
        stdio: 'inherit',
      });
    } else {
      const errors = {};

      try {
        await execa('npx', ['create-workflow-home', path], {
          stdio: 'inherit',
        });
      } catch (error) {
        errors.npx = error;

        try {
          await execa('yarn', ['create', 'workflow-home', path], {
            stdio: 'inherit',
          });
        } catch (error) {
          errors.yarn = error;

          try {
            await execa('npm', ['init', 'workflow-home', path], {
              stdio: 'inherit',
            });
          } catch (error) {
            errors.npm = error;

            console.log();
            console.error('Could not generate workflow-home at:', path);
            console.error();
            console.error('Tried all of these: ');
            for (let [cmd, error] of Object.entries(errors)) {
              console.error(cmd + ':');
              console.error(error);
              console.log();
            }
          }
        }
      }
    }
    console.log();
    console.log('Running `npm install`');
    await execa('npm', ['i'], { stdio: 'inherit', cwd: path });

    console.log();
    console.log('workflow was successfully installed. ');
    console.log();
    console.log('Try the example with `workflow Example.js`');
  } else {
    console.log();
    console.log('Process aborted and no workflow-home was created.');
    console.log('Workflow will not work until you set up a workflow-home folder.');
    process.exit(1);
  }
}

async function promptYesNo(question) {
  const schema = {
    properties: {
      answer: {
        type: 'string',
        pattern: '^[ynYN]$',
        description: question + ' (y/n)',
        default: 'y',
      },
    },
  };

  prompt.start();

  const { answer } = await promisify(prompt.get)(schema);

  return answer === 'y' || answer === 'Y';
}
