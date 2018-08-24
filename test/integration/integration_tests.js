/* eslint-env node, jest */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import { registerIntegrationTests } from 'shared/test/integration';

registerIntegrationTests({
  Root: require('./test_cases'),
  WorkflowLayoutYoga: require('../../packages/workflow-layout-yoga/test/integration/test_cases'),
});
