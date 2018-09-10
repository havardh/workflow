/* eslint-env node */
import { baseFolder } from 'shared/env';
import readPkgUp from 'read-pkg-up';

export default async function version() {
  const { pkg } = await readPkgUp({ cwd: __dirname });
  console.log(pkg.version);
}
