/* eslint-env node */
/* eslint-disable no-console */
import execa from 'execa';
import ncu from 'npm-check-updates';
import { join } from 'path';
import fs from 'fs';
import prompt from 'prompt';
import { promisify } from 'util';
import readPkgUp from 'read-pkg-up';

import { baseFolder } from 'shared/env';
import { which } from 'shared/shell';

const promptGetAsync = promisify(prompt.get);

export async function update(args) {
  if (args.force || (await noUncommitChanges(baseFolder))) {
    if (args.force) {
      console.log('Ignoring uncommited changes with `--force` flag');
    }

    await updateWorkflowCommand();
    await updateWorkflowHome(args);
  } else {
    console.log('Uncommited changes was found in', baseFolder);
    console.log('Either commit the changes or re-run this command with `--force`.');
  }
}

async function noUncommitChanges(folder) {
  if (which('git').code === 1) {
    console.log('`git` command was not found. Disabling uncommited changes check.');
    return true;
  }

  if (!fs.existsSync(join(folder, '.git'))) {
    console.log(`Could not find a git repo in ${folder}. Disabling uncommited changes check.`);
    return true;
  }

  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree']);
  } catch (e) {
    if (e.code !== 128) {
      console.error(e);
      process.exit(1);
    } else {
      return false;
    }
  }

  try {
    await execa('git', ['diff-index', '--quiet', 'HEAD', '--'], { cwd: folder });
    return true;
  } catch (e) {
    if (e.code === 1) {
      return false;
    } else {
      console.error(e);
      process.exit(1);
    }
  }

  return false;
}

async function updateWorkflowCommand() {
  try {
    const { stdout: version } = await execa('workflow', ['--version']);
    const { stdout: latest } = await execa('npm', ['show', 'workflow', 'version']);

    if (version.toString() !== latest.toString()) {
      await execa('npm', ['install', '--global', 'workflow'], { stdio: 'inherit' });
    } else {
      console.log('workflow is up to date at', version.trim());
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function updateWorkflowHome(args) {
  try {
    await execa('npm', ['outdated'], { cwd: baseFolder, stdio: 'inherit' });

    console.log('workflow home is up to date');
    return;
  } catch (e) {
    if (e.code !== 1) {
      throw e;
    }
  }

  if (!args.force) {
    prompt.message = '';
    prompt.start();
    const { update } = await promptGetAsync({
      properties: {
        update: {
          type: 'string',
          pattern: '^[ynYN]$',
          description: 'Are you sure? (Y/n)',
          default: 'y',
        },
      },
    });
  }

  if (update === 'n' || update === 'N') {
    console.log();
    console.log('Exit without making changes to', baseFolder);
    process.exit(0);
  }

  let stdout;
  try {
    await execa('npm', ['outdated'], { cwd: baseFolder });
  } catch (e) {
    stdout = e.stdout;
  }

  const updatedPackages = parsePackages(stdout);
  try {
    for (let pkg of updatedPackages) {
      if (args.latest) {
        await execa('npm', ['install', `${pkg}@latest`], { cwd: baseFolder, stdio: 'inherit' });
      } else {
        await execa('npm', ['update', pkg], { cwd: baseFolder, stdio: 'inherit' });
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  try {
    await execa('npm', ['install'], { cwd: baseFolder, stdio: 'inherit' });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function hasUpdates(code) {
  return code !== 0;
}

function parsePackages(outdatedOutput) {
  const packages = [];
  const lines = outdatedOutput.split('\n');
  for (let line of lines) {
    if (!line.startsWith('Package')) {
      if (line.split(' ')[0]) {
        packages.push(line.split(' ')[0]);
      }
    }
  }
  return packages;
}
