/* eslint-env node, jest */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import { registerIntegrationTests } from 'shared/test/integration';

registerIntegrationTests({
  Root: require('./test_cases').testCases,
  WorkflowLayoutYoga: require('../../packages/workflow-layout-yoga/test/integration/test_cases')
    .testCases,
});
