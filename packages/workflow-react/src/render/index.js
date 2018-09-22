import { createElement } from '../utils/createElement';
import { createRenderer } from '../reconciler/index';
import { parse } from '../parse/index';

export let ROOT_NODE; // eslint-disable-line import/no-mutable-exports

let renderer, node;

// Renders the input component
export function render(element) {
  return workflow => {
    if (!renderer) {
      renderer = createRenderer(workflow);
    }

    // Create root container instance
    if (!ROOT_NODE) {
      ROOT_NODE = createElement('ROOT');
    }

    const container = ROOT_NODE;
    // Returns the current fiber (flushed fiber)
    if (!node) {
      node = renderer.createContainer(container);
    }

    // Schedules a top level update with current fiber and a priority level
    // (depending upon the context)
    renderer.updateContainer(element, node, null);

    // WordRenderer.injectIntoDevTools({
    //   bundleType: 1,
    //   version: '0.1.0',
    //   rendererPackageName: 'custom-renderer',
    //   findHostInstanceByFiber: WordRenderer.findHostInstance
    // })

    // Parse the input component and return the output
    return parse(container);
  };
}
