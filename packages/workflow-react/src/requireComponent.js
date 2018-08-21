/* eslint-env node */
import createComponent from './createComponent';

function createComponentRecursive(module) {
  if (module.type) {
    return createComponent(module);
  } else {
    return Object.assign(
      {},
      ...Object.keys(module).map(k => ({
        [k]: createComponentRecursive(module[k]),
      }))
    );
  }
}

export default function requireComponent(path) {
  const module = require(path);

  const componentModule = createComponentRecursive(module);

  if (componentModule.default) {
    const { default: Component, ...rest } = componentModule;

    for (let [name, value] of Object.entries(rest)) {
      Component[name] = value;
    }

    return Component;
  } else {
    return componentModule;
  }
}
