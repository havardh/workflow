/* eslint-env node */
/* eslint-disable no-console */
import { baseFolder } from 'shared/env';
import { join } from 'path';
import defaultBrowser from 'default-browser';

function getUserDefaults() {
  try {
    const path = join(baseFolder, 'apps', 'defaults');
    const defaultModule = require(path);

    return defaultModule.default || defaultModule;
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    } else {
      return {};
    }
  }
}

function throwUnknownPlatform() {
  console.log(`Platform '${process.platform}' not supported`);
  console.log(
    'Look for an issue for your platform here: https://github.com/havardh/workflow/issues'
  );
  process.exit(0);
}

async function requireBrowser(browserName, fallback) {
  try {
    return require(`workflow-app-${browserName}`);
  } catch (error) {
    console.log(`Cannot find ${browserName}, falling back to ${fallback}`);
    return require(`workflow-app-${fallback}`);
  }
}

async function getDefaultBrowser(platform) {
  // $FlowSuppress
  if (process.browser) {
    return require('workflow-apps-html').defaults.Browser;
  }
  const browser = getUserDefaults().Browser;
  if (browser) {
    return browser;
  }
  switch (platform) {
    case 'darwin':
      return requireBrowser((await defaultBrowser()).name.toLowerCase(), 'safari');

    case 'linux':
      return requireBrowser((await defaultBrowser()).name.toLowerCase(), 'chrome');

    case 'win32':
      return require('workflow-app-chrome').Chrome;

    default:
      return throwUnknownPlatform();
  }
}

function getDefaultTerminal(platform) {
  // $FlowSuppress
  if (process.browser) {
    return require('workflow-apps-html').defaults.Terminal;
  }
  const terminal = getUserDefaults().Terminal;
  if (terminal) {
    return terminal;
  }
  switch (platform) {
    case 'darwin':
      return require('workflow-app-iterm').ITerm;
    case 'win32':
      return require('workflow-app-powershell').Powershell;
    case 'linux':
      return require('workflow-app-xterm').Xterm;
    default:
      return throwUnknownPlatform();
  }
}

function getDefaultTextEditor(platform) {
  // $FlowSuppress
  if (process.browser) {
    return require('workflow-apps-html').defaults.TextEditor;
  }
  const editor = getUserDefaults().TextEditor;
  if (editor) {
    return editor;
  }
  switch (platform) {
    case 'darwin':
      return require('workflow-app-textedit').TextEdit;
    case 'win32':
      return require('workflow-app-notepad').Notepad;
    case 'linux':
      return require('workflow-app-atom').Atom;
    default:
      return throwUnknownPlatform();
  }
}

export const Browser = {
  type: 'async',
  loader: () => getDefaultBrowser(process.platform),
};
export const TextEditor = getDefaultTextEditor(process.platform);
export const Terminal = getDefaultTerminal(process.platform);
