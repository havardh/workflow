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
  const updates = await ncu.run({
    packageFile: join(baseFolder, 'package.json'),
    silent: false,
    jsonUpgraded: true,
    semverLevel: args.latest ? undefined : 'major',
  });

  if (hasUpdates(updates)) {
    console.log(await buildUpdatesMessage(updates));

    if (!args.force) {
      prompt.message = '';
      prompt.start();
      const { update } = await promptGetAsync({
        properties: {
          update: {
            type: 'string',
            pattern: '^[ynYN]$',
            description: 'Are you sure? (Y/n)\n',
            default: 'y',
          },
        },
      });

      if (update === 'n' || update === 'N') {
        console.log();
        console.log('Exit without making changes to', baseFolder);
        process.exit(0);
      }
    }

    let flags = [];
    if (args.latest) {
      flags = ['npm-check-updates', '--packageFile', join(baseFolder, 'package.json'), '-u'];
    } else {
      flags = [
        'npm-check-updates',
        '--packageFile',
        join(baseFolder, 'package.json'),
        '--semverLevel',
        'major',
        '-u',
      ];
    }
    try {
      await execa('npx', flags, { stdio: 'inherit' });
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
  } else {
    console.log('workflow-home is up to date');
  }
}

function hasUpdates(updates) {
  return Object.entries(updates).length !== 0;
}

async function buildUpdatesMessage(updates) {
  const { pkg } = await readPkgUp({ cwd: baseFolder });
  let message = 'The following packages will be updated\n\n';

  if (pkg.dependencies) {
    message += buildDependenciesMessage(pkg.dependencies, updates);
  }

  if (pkg.optionalDepenencies) {
    message += buildDependenciesMessage(pkg.optionalDependencies, updates);
  }

  if (pkg.devDepenencies) {
    message += buildDependenciesMessage(pkg.devDependencies, updates);
  }
  return message + '\n';
}

function buildDependenciesMessage(dependencies, updates) {
  let message = '';
  for (let [name, version] of Object.entries(dependencies)) {
    if (updates[name]) {
      message += `  - ${name}  ${version} → ${updates[name]}` + '\n';
    }
  }
  return message;
}
