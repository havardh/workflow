// @flow
/* eslint-disable import/prefer-default-export */
import { projectRoot } from './git';
import { exec } from '../util/shell';

function findParent(root, file) {
  const results = exec(`cd ${root} && git grep '${file}' -- */src/*`);
  return results.split('\n')[0].split(':')[0].replace('.js', '');
}

function findImportedName(file, name) {
  const importLine = exec(`cat ${file}.js | grep ${name}`);
  return importLine.split(' ')[1];
}


function indentationOf(route) {
  return route && route.indexOf('<');
}

function getPath(line) {
  const start = line.indexOf('path="') + 6;
  const end = line.indexOf('"', start + 1);

  return line.substring(start, end);
}

function findPath(routerFile, page) {
  const lines = exec(`cat ${routerFile}.js`).split('\n');

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
