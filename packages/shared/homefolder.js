/* eslint-env node */
import { resolve } from 'path';

export function isValidWorkflowHome(path) {
  try {
    const { name } = require(resolve(path, 'package.json'));
    if (name === 'workflow-user-home') {
      return true;
    } else {
      throw new Error(`Invalid workflow-home package name: '${name}'
expected 'workflow-user-home'`);
    }
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    }
  }

  return false;
}
