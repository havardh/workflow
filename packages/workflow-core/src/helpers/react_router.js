// @flow
/* eslint-disable import/prefer-default-export */
import { projectRoot } from './git';
import { exec } from 'shared/shell';

function removeOneDirectory(file: string): string {
  const index = file.indexOf('/');

  if (index === -1) {
    return '';
  }

  return file.substring(index + 1);
}

function findParent(root: string, file: string): string {
  let filename = file;
  let parent;
  while (!parent && filename) {
    const results = exec(`cd ${root} && git grep '${filename}' -- */src/*`, false);
    parent = results.split('\n')[0].split(':')[0].replace('.js', '');
    if (parent) {
      return parent;
    }
    filename = removeOneDirectory(filename);
  }
  throw new Error(`Could not find ${file} in ${root}`);
}

function findImportedName(file: string, name: string): string {
  let importName = name;
  let importedName;
  while (!importedName && importName) {
    const importLine = exec(`cat ${file}.js | grep ${importName}`, false);
    importedName = importLine.split(' ')[1];
    if (importedName) {
      return importedName;
    }
    importName = removeOneDirectory(importName);
  }

  return '';
}

function indentationOf(route: string): number {
  if (route) {
    return route.indexOf('<');
  }
  return -1;
}

function getPath(line) {
  const start = line.indexOf('path="') + 6;
  const end = line.indexOf('"', start + 1);

  return line.substring(start, end);
}

function findPath(routerFile, page) {
  const lines = exec(`cat ${routerFile}.js`, false).split('\n');

  const routeSegments = [];
  let indexOfPage = -1;
  for (const i in lines) { // eslint-disable-line no-restricted-syntax
    if (lines[i].includes(`component={${page}}`)) {
      indexOfPage = Number(i);
      routeSegments.unshift(lines[i]);
    }
  }

  let indentation = indentationOf(lines[indexOfPage]);

  for (let i = indexOfPage - 1; i > 0; i -= 1) {
    if (lines[i].includes('Route')
      && !lines[i].includes('import')
      && indentationOf(lines[i]) < indentation) {
      indentation = indentationOf(lines[i]);
      routeSegments.unshift(lines[i]);
    }
  }

  return routeSegments.map(getPath).join('/');
}

export function findRouteForComponent(file: string) {
  const root = projectRoot(file);

  let name = file.replace(`${root}/`, '').replace('.js', '');
  while (!name.includes('_page')) {
    name = findParent(root, name);
  }

  const router = findParent(root, name);

  const routerFile = `${root}/${router}`;
  const page = findImportedName(routerFile, name);

  return findPath(routerFile, page);
}
