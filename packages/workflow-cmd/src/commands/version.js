/* eslint-env node */
/* eslint-disable no-console */
import { baseFolder, configPath } from 'shared/env';
import readPkgUp from 'read-pkg-up';

export default async function version({ verbose }) {
  const { pkg } = await readPkgUp({ cwd: __dirname });
  console.log('workflow:', pkg.version);

  if (verbose) {
    console.log();
    console.log('Config:', configPath);
    console.log();
    console.log(`Dependencies: `);
    await printDependenciesVersion();
  }
}

async function printDependenciesVersion() {
  const { pkg } = await readPkgUp({ cwd: baseFolder });

  for (let [key, value] of Object.entries(pkg.dependencies)) {
    console.log(` - ${key}: ${value}`);
  }
}
