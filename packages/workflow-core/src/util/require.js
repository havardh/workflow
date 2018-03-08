// @flow
/* eslint-env node */
/* eslint-disable import/prefer-default-export, import/no-dynamic-require, global-require */

export function requireWrapper(name: string) {
  // $FlowSuppress
  return require(name);
}

export default { require: requireWrapper };
