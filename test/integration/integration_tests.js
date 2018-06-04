/* eslint-env node, jest */
import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

import {registerIntegrationTests} from "shared/test/integration";

registerIntegrationTests({
  "Root": require("./integration_test_cases"),
  "WorkflowLayoutYoga": require("../../packages/workflow-layout-yoga/test/integration/yoga_layout_tests")
});
