// @flow
/* eslint-disable import/prefer-default-export */
import { findRouteForComponent } from './react_router';

export function getTestFile(file: string): string { // eslint-disable-line no-unused-vars
  return file
    .replace('src', 'test')
    .replace('.js', '_tests.js');
}

export function urlForComponent(file: string): string {
  const route = findRouteForComponent(file);
  return `http://localhost:9090/advisor/advisor/#/${route}`
    .replace(':caseRef', '1');
}
