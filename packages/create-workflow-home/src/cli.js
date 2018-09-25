/* eslint-env node */
import { createWorkflowHome } from './index.js';
import { parse } from './args';

const { targetFolder } = parse(process.argv);

createWorkflowHome(targetFolder);
