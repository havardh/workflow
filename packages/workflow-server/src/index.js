import * as ipc from './ipc';
import * as ws from './ws';
import { all } from './registry';

import './http';

export function apply({ appId, ...params }) {
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
      return;
    }
  }
}
