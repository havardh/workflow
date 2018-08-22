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

  if (dev && command.endsWith('node')) {
    console.log('Running dev mode');

    const [node, cmd, targetFolder] = args;

    if (args.length === 2) {
      return {};
    } else if (args.length === 3) {
      return { targetFolder };
    } else {
      console.error('Invalid arguments');
      console.log();
      usage();
      process.exit(1);
    }
  }

  switch (command) {
    case 'npm':
      if (args.length !== 3 || args.length !== 4) {
        console.error('Invalid number of arguments');
        console.log();
        usage();
        process.exit(1);
      } else if (args[1] !== 'init') {
        console.error('Unsupported npm command:', args[1]);
        console.log();
        usage();
        process.exit(1);
      } else if (args[2] !== 'workflow-home') {
        console.error('Unknown initializer name:', args[1]);
        console.log();
        usage();
        process.exit(1);
      } else if (args.length === 3) {
        return {};
      } else if (args.length === 4) {
        return { targetFolder: args[3] };
      }
      break;
    case 'yarn':
      if (args.length !== 3 || args.length !== 4) {
        console.error('Invalid number of arguments');
        console.log();
        usage();
        process.exit(1);
      } else if (args[1] !== 'create') {
        console.error('Unsupported yarn command:', args[1]);
        console.log();
        usage();
        process.exit(1);
      } else if (args[2] !== 'workflow-home') {
        console.error('Unknown initializer name:', args[1]);
        console.log();
        usage();
        process.exit(1);
      } else if (args.length === 3) {
        return {};
      } else if (args.length === 4) {
        return { targetFolder: args[3] };
      }
      break;
    case 'npx':
      if (args.length !== 2 || args.length !== 3) {
        console.error('Invalid number of arguments');
        console.log();
        usage();
        process.exit(1);
      } else if (args[2] !== 'create-workflow-home') {
        console.error('Unknown initializer name:', args[1]);
        console.log();
        usage();
        process.exit(1);
      } else if (args.length === 3) {
        return {};
      } else if (args.length === 4) {
        return { targetFolder: args[3] };
      }
  }
  console.log('Invalid arguments');
  console.log();
  usage();
  process.exit(1);
}
