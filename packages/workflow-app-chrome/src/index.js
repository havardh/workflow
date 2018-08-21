/* global Application */
import { platform } from 'shared/apps';

const chrome = {
  type: 'app',
  name: 'Chrome',
  xClass: 'Google-chrome',
  params: ['url'],
  open: platform({
    'win32-default': windows,
    'osx-default': osx,
    'linux-*': ({ url }) => `google-chrome-stable --new-window ${url}`,
  }),
};

async function osx({ url, position }, { run }) {
  run(
    (url, position) => {
      const chrome = Application('Google Chrome');

      chrome.activate();

      const window = chrome.Window().make();
      window.tabs[0].url = url;
      window.bounds = position;
    },
    url,
    position
  );
}

async function windows({ url, position }, { startOnPositionByWindowClass }) {
  await startOnPositionByWindowClass({
    cmd: 'chrome.exe',
    args: ['--new-window', url],
    className: 'Chrome_WidgetWin_1',
    position,
  });
}

export default chrome;
