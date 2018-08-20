import { platformDynamicServer } from '@angular/platform-server';
import { subscribe } from './workflowPlatform';

export function render(workflowModule) {
  const promise = new Promise(subscribe);
  platformDynamicServer().bootstrapModule(workflowModule);
  return promise;
}
