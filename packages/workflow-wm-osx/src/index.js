/* eslint-env node */
/* eslint-disable no-console */
import * as osascript from 'osascript';
import { run } from '@jxa/run';
import screen from 'screen-info';

import { findAllApps } from 'shared/tree';

async function wrapperRun(code, ...args) {
  try {
    return await run(code, ...args);
  } catch (error) {
    console.error('Could not execute jxa:');
    console.error(code.toString());
    console.error();
    console.error(error);
    throw error;
  }
}

async function open(node) {
  if (node.type !== 'app') {
    return {
      ...node,
      children: await Promise.all((node.children || []).map(open)),
    };
  } else {
    if (!node.isOpen) {
      console.log('open', node.name);
      const { windowId } = await node.open(
        mapPosition(node),
        { platform: 'osx', wm: 'default', run: wrapperRun },
        node.children
      );
      console.log('opened', windowId);
      return { ...node, windowId };
    } else {
      return { ...node };
    }
  }
}

async function register(node, waitFor) {
  if (node.type !== 'app') {
    return {
      ...node,
      children: await Promise.all((node.children || []).map(child => register(child, waitFor))),
    };
  } else if (node.type.connected !== true) {
    return { ...node };
  } else {
    console.log('register', node.name);
    const { appId, send } = await waitFor(node);
    console.log('registered', appId, send);
    return { ...node, send };
  }
}

async function update(node) {
  if (node.update) {
    await node.update(
      mapPosition(node),
      { platform: 'osx', wm: 'default', run: wrapperRun, send: node.send },
      node.children
    );
    console.log('done');
  }

  return {
    ...node,
    children: await Promise.all((node.children || []).map(update)),
  };
}

export class WorkflowWmOsx {
  screen() {
    const { width, height } = screen.main();

    return { left: 0, top: 0, width, height };
  }

  async apply(flow, waitFor) {
    flow = await open(flow); // call open on all not open apps and return windowIds

    flow = await register(flow, waitFor); // await newly open apps to return send method

    flow = await update(flow); // call update on all apps

    return flow;
  }

  async minimizeAll() {
    const script = `
    (function () {
      const applications = [ "Atom", "Safari", "iTerm" ];
      for (var i = 0; i<applications.length; i++) {
        const app = Application(applications[i]);
        for (var i=0; i<app.windows.length; i++) {
          app.windows[i].close();
        }
      }
      delay(1);

      for (var i = 0; i<applications.length; i++) {
        const app = Application(applications[i]);
        for (var i=0; i<app.windows.length; i++) {
          app.windows[i].close();
        }
      }
    }());
    `;

    return new Promise((resolve, reject) => {
      osascript.eval(script, function(err, result) {
        if (err) {
          console.error('Failed to execute osascript:');
          console.log(err);
          console.error(script);
          console.error();

          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

function mapPosition(app) {
  const { position } = app;

  return {
    ...app,
    position: {
      x: position.left,
      y: position.top,
      width: position.width,
      height: position.height,
    },
  };
}
