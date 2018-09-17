import { file } from 'tmp-promise';
import { outputFile } from 'fs-extra';

export async function write(layouts) {
  const content = layouts.map(layout => JSON.stringify(layout, null, '  ')).join('\n\n');

  const tmpobj = await file({ prefix: 'workflow-', postfix: '.json' });

  await outputFile(tmpobj.path, content);

  return tmpobj.path;
}
