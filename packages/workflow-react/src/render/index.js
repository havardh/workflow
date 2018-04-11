import { createElement } from '../utils/createElement';
import WorkflowRenderer from '../reconciler/index';
import parse from '../parse/index';

export let ROOT_NODE = {}; // eslint-disable-line import/no-mutable-exports

// Renders the input component
function render(element) {
  // Create root container instance
  ROOT_NODE = createElement('ROOT');
  const container = ROOT_NODE;
  // Returns the current fiber (flushed fiber)
  const node = WorkflowRenderer.createContainer(container);

  // Schedules a top level update with current fiber and a priority level
  // (depending upon the context)
  WorkflowRenderer.updateContainer(element, node, null);

  // WordRenderer.injectIntoDevTools({
  //   bundleType: 1,
  //   version: '0.1.0',
  //   rendererPackageName: 'custom-renderer',
  //   findHostInstanceByFiber: WordRenderer.findHostInstance
  // })

  // Parse the input component and return the output
  return parse(container).tree();
}

export default render;
