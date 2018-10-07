/* global Application */
import { platform } from 'shared/apps';

const buildUrl = ({ url, appId }) =>
  `http://localhost:9876/register?data=${encodeURIComponent(
    JSON.stringify({ redirect: url, appId })
  )}`;

export const Chrome = {
  type: 'app',
  name: 'Chrome',
  xClass: 'Google-chrome',
  connected: true,
  params: ['url', 'appId'],
  open: platform({
    'win32-default': openWindows,
    'osx-default': openOsx,
    'linux-*': openLinux,
  }),

  update: platform({
    'osx-default': updateOsx,
    'linux-*': updateLinux,
  }),
};

function openLinux({ url, appId }) {
  return `google-chrome-stable --new-window ${buildUrl({ url, appId })}`;
}

async function openOsx({ url, appId, position }, { run }) {
  const windowId = await run(
    (url, position) => {
      const chrome = Application('Google Chrome');

      chrome.activate();

      const window = chrome.Window().make();
      window.tabs[0].url = url;
      window.bounds = position;

      let id = 0;
      while (id <= 0) {
        id = window.id();
        delay(0.1);
      }
      return id;
    },

    buildUrl({ url, appId }),
    position
  );

  return { windowId };
}

async function openWindows({ url, appId, position }, { startOnPositionByWindowClass }) {
  await startOnPositionByWindowClass({
    cmd: 'chrome.exe',
    args: ['--new-window', buildUrl({ url, appId })],
    className: 'Chrome_WidgetWin_1',
    position,
  });
}

async function updateLinux({ url }, { send }) {
  if (send) {
    await send({ topic: 'workflow.apply', message: { url } });
  }
}

async function updateOsx({ url, windowId, position, appId }, { send, run }) {
  windowId = await run(
    (windowId, position, registerUrl) => {
      const chrome = Application('Google Chrome');

      if (chrome.windows.byId(windowId).exists()) {
        const window = chrome.windows.byId(windowId);
        window.bounds = position;
        return windowId;
      } else {
        chrome.activate();
        const window = chrome.Window().make();
        window.tabs[0].url = registerUrl;
        window.bounds = position;

        let id = 0;
        while (id <= 0) {
          id = window.id();
          delay(0.1);
        }
        return id;
      }
    },
    windowId,
    position,
    buildUrl({ url, appId })
  );

  if (send) {
    await send({ topic: 'workflow.apply', message: { url } });
  }

  return { windowId };
}
