import { resolve, join } from 'path';
import os from 'os';
import { configPath } from 'shared/env';

import * as WorkflowCore from 'workflow-core';

export default async function apply(path, args) {
  const configPath = args.config || join(os.homedir(), '.workflow', 'config.js');

  const config = require(resolve(configPath)).default || require(resolve(configPath));

  const workflow = new WorkflowCore.workflow(config);

  const absolutePath = await workflow.resolve(path);
  let flow = await workflow.load(absolutePath);
  flow = await workflow.transform(flow.default || flow, { args });
  const screen = await workflow.screen();
  const layout = await workflow.layout(flow, { screen });

  await workflow.apply(layout);
}

/*
function apply(path) {
  const apps = findAllApps(tree);

  for (let { appId, ...params } of findAllApps(tree)) {
    for (let app of all()) {
      if (app.appId == appId) {
        switch (app.connection) {
          case 'ipc':
            ipc.apply(app, params);
            break;
          case 'ws':
            ws.apply(app, params);
            break;
        }
      }
    }
  }
}
*/
