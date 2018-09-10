import execa from 'execa';
import ncu from 'node-check-updates';
import { baseFolder } from 'shared/env';
import { join } from 'path';

export default async function update(args) {
  try {
    await execa('npm', ['install', '--global', 'workflow']);
    console.log('$ workflow version');
    await execa('workflow', ['version']);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  ncu
    .run({
      packageFile: join(baseFolder, 'package.json'),
      semverLevel: 'major',
      silent: !!args.verbose,
      jsonUpgraded: false,
    })
    .then(upgraded => {
      console.log('dependencies to upgrade:', upgraded);
    });
}
