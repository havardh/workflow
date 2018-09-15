import { all } from './registry';
import { findAllApps } from 'shared/tree';
import apply from './apply';

import * as serviceIpc from './services/ipc';
import * as serviceWs from './services/ws';
import * as serviceHttp from './services/http';

const servers = [serviceIpc, serviceWs, serviceHttp];

import * as clientIpc from './ipc';

export function start() {
  for (let server of servers) {
    server.start();
  }

  clientIpc.start(apply);
}

export function stop() {
  for (let server of servers) {
    server.stop();
  }
}

start();
