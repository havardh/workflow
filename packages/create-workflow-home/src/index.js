/* eslint-env node */
/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';
import set from 'lodash.set';
import get from 'lodash.get';
import parse from './args';

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
  const configTemplatePath = resolveSource('templates', 'config.js');
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
    const versionPath = resolveSource('versions.json');

    const versionsString = fs.readFileSync(versionPath, 'utf8');
    const versions = JSON.parse(versionsString);

    readVersions.versions = set(
      versions,
      'workflow.wm',
      get(versions, `workflow.wm.${platform}.${wm}`)
    );
  }

  return readVersions.versions;
}

function renderTemplate(template, path, values) {
  const templateString = fs.readFileSync(template, 'utf8');

  const renderedTemplate = templateString.replace(/{{([a-z.]*)}}/g, (_, prelude) =>
    get(values, prelude)
  );

  fs.writeFileSync(path, renderedTemplate);
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
