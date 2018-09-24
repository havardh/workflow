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
  params: ['url', 'appId'],
  open: platform({
    'win32-default': windows,
    'osx-default': osx,
    'linux-*': linux,
  }),
  update({ url }, { send }) {
    send({ topic: 'workflow.apply', message: { url } });
  },
};

function linux({ url, appId }) {
  return `google-chrome-stable --new-window ${buildUrl({ url, appId })}`;
}

async function osx({ url, appId, position }, { run }) {
  run(
    (url, position) => {
      const chrome = Application('Google Chrome');

      chrome.activate();

      const window = chrome.Window().make();
      window.tabs[0].url = url;
      window.bounds = position;
    },
    buildUrl({ url, appId }),
    position
  );
}

async function windows({ url, appId, position }, { startOnPositionByWindowClass }) {
  await startOnPositionByWindowClass({
    cmd: 'chrome.exe',
    args: ['--new-window', buildUrl({ url, appId })],
    className: 'Chrome_WidgetWin_1',
    position,
  });
}
