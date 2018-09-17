/* eslint-env node */
import { createComponentRecursive } from './createComponent';

export function requireComponent(path) {
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
