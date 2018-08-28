/* eslint-env node */
/* eslint-disable no-console */
import { dev } from 'shared/env';

function usage() {
  console.log(`Initialize workflow-home directory

Usage:
  npm init workflow-home [target]
  npx create-workflow-home [target]
  yarn create workflow-home [target]

Initializes the current directory or target if given
with the create-workflow-home initializer.
`);
}

export default function parse(args) {
  if (args.length < 1) {
    console.error('Invalid number of arguments');
    console.log();
    usage();
    process.exit(1);
  }

  const command = args[0];

  const [node, cmd, targetFolder] = args; // eslint-disable-line

  if (args.length === 2) {
    return {};
  } else if (args.length === 3) {
    return { targetFolder };
  } else {
    console.error("Invalid arguments: '" + args.join(' ') + "'");
    console.log();
    usage();
    process.exit(1);
  }
}
