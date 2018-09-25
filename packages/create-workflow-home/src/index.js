/* eslint-env node */
/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';
import get from 'lodash.get';
import { parse } from './args';
import { pascalCase } from 'change-case';

import { platform, wm } from 'shared/env';

const { targetFolder } = parse(process.argv);

Promise.resolve()
  .then(ensureTargetExists)
  .then(createPackageJson)
  .then(createConfigJs)
  .then(copyStaticFiles)
  .then(() => console.log('Initialized:', resolveTargetFolder()))
  .catch(err => console.error(err)); // eslint-disable-line no-console

function ensureTargetExists() {
  fs.mkdirpSync(path.resolve(resolveTargetFolder()));
}

function createPackageJson() {
  const pkgPath = resolveTarget('package.json');

  if (fs.existsSync(pkgPath)) {
    throw new Error('Upgrade existing folder is not supported');
  }

  const versions = readVersions();
  const pkgTemplatePath = resolveSource('templates', 'package.json');

  renderTemplate(pkgTemplatePath, pkgPath, versions);
}

function createConfigJs() {
  const configPath = resolveTarget('config.js');
  const configTemplatePath = resolveSource('templates', 'config.js.template');
  const versions = readVersions();

  renderTemplate(configTemplatePath, configPath, versions);
}

function copyStaticFiles() {
  const source = resolveSource('static/');
  const destination = resolveTarget();

  fs.copySync(source, destination);
}

function readVersions() {
  if (!readVersions.versions) {
    const rootPkgPath = resolveRoot('package.json');
    const rootPkgString = fs.readFileSync(rootPkgPath, 'utf8');
    const rootPkg = JSON.parse(rootPkgString);
    const { version, devDependencies } = rootPkg;

    const workflowWmName = resolvePlatformWorkflowWm();

    readVersions.versions = {
      ...devDependencies,
      'workflow.home.version': version,
      'workflow.wm.name': workflowWmName,
      'workflow.wm.named-export': pascalCase(workflowWmName),
      'workflow.wm.version': devDependencies[workflowWmName],
    };
  }

  return readVersions.versions;
}

function resolvePlatformWorkflowWm() {
  switch (`${platform}-${wm}`) {
    case 'linux-i3':
      return 'workflow-wm-i3';
    case 'darwin-default':
      return 'workflow-wm-osx';
    case 'win32-default':
      return 'workflow-wm-windows';
    case 'linux-default':
      return 'workflow-wm-wmctrl';
    default:
      throw new Error(`Cannot initialize platform ${platform}-${wm}`);
  }
}

function renderTemplate(template, path, values) {
  const templateString = fs.readFileSync(template, 'utf8');

  const renderedTemplate = templateString.replace(/{{([a-z.-]*)}}/g, (_, prelude) =>
    get(values, prelude)
  );

  fs.writeFileSync(path, renderedTemplate);
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
