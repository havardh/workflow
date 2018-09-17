/* eslint-env node */
/* eslint-disable no-console */
function usage() {
  console.log(`Initialize a new workflow app

Usage:
  npm init workflow-app [target]
  npx create-workflow-app [target]
  yarn create workflow-app [target]

Initializes the current directory or target if given
with the create-workflow-app initializer.
`);
}

export function parse(args) {
  if (args.length < 1) {
    console.error('Invalid number of arguments');
    console.log();
    usage();
    process.exit(1);
  }

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
