/* eslint-env node */
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import get from 'lodash.get';
import prompt from 'prompt';
import { fileSync } from 'find';
import execa from 'execa';

import { parse } from './args';

const { targetFolder } = parse(process.argv);

Promise.resolve()
  .then(promptPackageDetails)
  .then(renderTemplates)
  .then(copyStaticFiles)
  .catch(err => console.error(err)); // eslint-disable-line no-console

async function promptPackageDetails() {
  const packageName = path.basename(resolveTarget());

  var schema = {
    properties: {
      packageName: {
        pattern: /^[a-zA-Z-]+$/,
        default: packageName,
        required: true,
      },
      description: {
        required: false,
      },
    },
  };

  prompt.start();

  return promisify(prompt.get)(schema);
}

function renderTemplates({ packageName, description }) {
  const versions = readVersions();
  const templates = findTemplates();

  for (let templateName of templates) {
    const pkgPath = resolveTarget(templateName);
    const templatePath = resolveSource('templates', templateName);

    renderTemplate(templatePath, pkgPath, {
      ...versions,
      packageName,
      description,
    });
  }
}

function copyStaticFiles() {
  const source = resolveSource('static/');
  const destination = resolveTarget();

  fs.copySync(source, destination);
}

function findTemplates() {
  const templateBase = resolveSource('templates');

  return fileSync(templateBase).map(absolutePath => path.relative(templateBase, absolutePath));
}

function readVersions() {
  if (!readVersions.versions) {
    const rootPkgPath = resolveRoot('package.json');
    const rootPkgString = fs.readFileSync(rootPkgPath, 'utf8');
    const rootPkg = JSON.parse(rootPkgString);
    const { version, devDependencies } = rootPkg;

    readVersions.versions = {
      ...devDependencies,
      'workflow.app.version': version,
    };
  }

  return readVersions.versions;
}

async function renderTemplate(template, targetPath, values) {
  const templateString = fs.readFileSync(template, 'utf8');

  let renderedTemplate = templateString.replace(/{{([a-zA-Z.-]*)}}/g, (_, prelude) =>
    get(values, prelude)
  );

  if ((await isWorkflowRepo()) && isPackageJson(targetPath)) {
    renderedTemplate = filterWorkflowRepoPackageJson(renderedTemplate);
  }

  await fs.mkdirp(path.dirname(targetPath));
  fs.writeFileSync(targetPath, renderedTemplate);
}

function resolveRoot(...args) {
  return path.join(__dirname, '..', ...args);
}

function resolveSource(...args) {
  return path.join(__dirname, '..', 'files', ...args);
}

function resolveTarget(...args) {
  if (args) {
    return path.join(resolveTargetFolder(), ...args);
  } else {
    return resolveTargetFolder();
  }
}

function resolveTargetFolder() {
  if (targetFolder) {
    return path.resolve(targetFolder);
  } else {
    return path.resolve();
  }
}

function isPackageJson(path) {
  return resolveTarget('package.json') === path;
}

async function isWorkflowRepo() {
  try {
    const { stdout } = await execa('git', ['config', '--get', 'remote.origin.url']);
    return stdout.trim() === 'git@github.com:havardh/workflow.git';
  } catch (e) {
    return false;
  }
}

function filterWorkflowRepoPackageJson(pkgJsonString) {
  const json = JSON.parse(pkgJsonString);

  delete json.devDependencies;

  return JSON.stringify(json, null, 2) + '\n';
}
