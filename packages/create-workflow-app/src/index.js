/* eslint-env node */
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import set from 'lodash.set';
import get from 'lodash.get';
import prompt from 'prompt';
import { fileSync } from 'find';

import parse from './args';
import { platform, wm } from 'shared/env';

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
  const variables = readVariables();
  const templates = findTemplates();

  for (let templateName of templates) {
    const pkgPath = resolveTarget(templateName);
    const templatePath = resolveSource('templates', templateName);

    renderTemplate(templatePath, pkgPath, {
      ...variables,
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

function readVariables() {
  if (!readVariables.variables) {
    const variablesPath = resolveSource('variables.json');

    const variablesString = fs.readFileSync(variablesPath, 'utf8');
    const variables = JSON.parse(variablesString);

    readVariables.variables = set(
      variables,
      'workflow.wm',
      get(variables, `workflow.wm.${platform}.${wm}`)
    );
  }

  return readVariables.variables;
}

async function renderTemplate(template, targetPath, values) {
  const templateString = fs.readFileSync(template, 'utf8');

  const renderedTemplate = templateString.replace(/{{([a-zA-Z.]*)}}/g, (_, prelude) =>
    get(values, prelude)
  );

  await fs.mkdirp(path.dirname(targetPath));
  fs.writeFileSync(targetPath, renderedTemplate);
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
