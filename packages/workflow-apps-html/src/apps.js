/* eslint-env browser */
import uuidv4 from 'uuid/v4';
import { Terminal as XTerm } from 'xterm';
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as WebfontLoader from 'xterm-webfont';
import './apps.css';

const theme = {
  foreground: '#383a42',
  background: '#f9f9f9',
  cursor: '#d0d0d0',
  cursorAccent: '#d0d0d0',
  selection: '#ffffff',
  black: '#000000',
  red: '#E45649',
  green: '#50A14F',
  yellow: '#986801',
  blue: '#4078F2',
  magenta: '#A626A4',
  cyan: '#0184BC',
  white: '#A0A1A7',
  brightBlack: '#5c6370',
  brightRed: '#e06c75',
  brightGreen: '#50A14F',
  brightYellow: '#986801',
  brightBlue: '#4078F2',
  brightMagenta: '#A626A4',
  brightCyan: '#0184BC',
  brightWhite: '#ffffff',
};

XTerm.applyAddon(fit);
XTerm.applyAddon(WebfontLoader);

function div({ className, position, children }) {
  const el = document.createElement('div');
  el.classList.add(className);

  if (position) {
    el.style.position = 'absolute';
    el.style.top = position.top;
    el.style.left = position.left;
    el.style.width = position.width;
    el.style.height = position.height;
  }

  if (children) {
    for (let child of children) {
      if (typeof child === 'string') {
        el.textContent = child;
      } else {
        el.appendChild(child);
      }
    }
  }

  return el;
}

function iframe({ file }) {
  const el = document.createElement('iframe');
  el.setAttribute('frameBorder', 0);

  el.onload = () => {
    if (file) {
      el.contentDocument.write(file.content);
    }
  };

  if (file) {
    file.listeners = file.listeners || [];
    file.listeners.push(fileContent => {
      el.src = 'about:blank';
      el.contentDocument.write(fileContent);
    });
  }

  return el;
}

function input({ value }) {
  const el = document.createElement('input');

  el.setAttribute('value', value);

  return el;
}

function xterm({ cwd, cmd, position }) {
  const id = uuidv4();
  const div = document.createElement('div');
  div.setAttribute('id', id);

  if (position) {
    div.style.width = position.width;
    div.style.height = position.height;
  }

  setTimeout(() => {
    const prompt = `${cwd} $ `;
    const div = document.getElementById(id);
    const terminal = new XTerm({ theme });
    terminal.open(div);
    terminal.fit();
    terminal.prompt = function() {
      terminal.write(`\r\n ${prompt}`);
    };
    div.addEventListener('onremove', () => {
      terminal.destroy();
    });

    terminal.prompt();
    terminal.write(cmd);

    terminal.on('key', (key, ev) => {
      const printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        terminal.prompt();
      } else if (ev.keyCode === 8) {
        if (terminal.x > prompt.length) {
          terminal.write('\b \b');
        }
      } else if (printable) {
        terminal.write(key);
      }
    });
  }, 1000);

  return div;
}

function ace({ file, position }) {
  const id = uuidv4();
  const div = document.createElement('div');
  div.setAttribute('id', id);
  div.textContent = 'Loading text editor...';

  setTimeout(() => {
    div.textContent = readFile(file).content;
    const editor = window.ace.edit(id);
    editor.setTheme('ace/theme/tomorrow');
    if (file.endsWith('.js')) {
      const JavaScriptMode = window.ace.require('ace/mode/javascript').Mode;
      editor.session.setMode(new JavaScriptMode());
    } else if (file.endsWith('.html')) {
      const Mode = window.ace.require('ace/mode/html').Mode;
      editor.session.setMode(new Mode());
    }
    editor.getSession().on('change', function() {
      file.content = editor.getSession().getValue();
      if (file.listeners) {
        file.listeners.map(listener => listener(file.content));
      }
    });
    div.addEventListener('onremove', () => {
      editor.destroy();
      editor.container.remove();
    });
  }, 500);

  div.style.position = 'absulute';
  div.style.top = 0;
  div.style.left = 0;
  div.style.width = position.width;
  div.style.height = position.height;

  return div;
}

const fileSystem = {
  home: {
    user: {
      dev: {
        app: {
          'index.html': {
            content: `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1> Hello, World! </h1>
  </body>
</html>`,
          },
        },
        workflow: {
          'index.js': `const foo = () => {
  console.log("Hello");
}

foo();`,
          src: {
            'index.js': {
              content: `// index.js
export default add(a, b) {
  return a + b;
}`,
            },
          },
          test: {
            'index_tests.js': {
              content: `// index_tests.js
import { add } from "../src/index";

it("should add positive integers", () => {
  expect(add(1, 2)).toEqual(3);
});`,
            },
          },
        },
      },
    },
  },
};

function readFile(path) {
  const pathSegments = path.split('/').slice(1);

  let file = fileSystem;
  try {
    for (let segment of pathSegments) {
      file = file[segment];
    }
  } catch (e) {
    file = '';
  }
  return file;
}

export const Ace = {
  type: 'app',
  params: ['file'],
  open: ({ app, position }) => {
    const file = app.file;

    return div({
      className: 'editor',
      position,
      children: [ace({ file, position })],
    });
  },
  name: 'Ace',
};

export const XTermJS = {
  type: 'app',
  params: ['cwd', 'cmd'],
  open: ({ app, position }) => {
    const { cwd, cmd } = app;
    return div({
      className: 'xterm',
      position,
      children: [xterm({ cwd, cmd, position })],
    });
  },
  name: 'XTerm',
};

export const Browser = {
  type: 'app',
  params: ['url'],
  open: ({ app, position }) => {
    const { url } = app;

    const address = div({
      className: 'address',
      children: [input({ value: url })],
    });

    let page;
    if (url.startsWith('file://')) {
      const file = readFile(url.replace('file://', ''));
      page = iframe({ file });
    }

    return div({
      className: 'browser',
      position,
      children: [address, page],
    });
  },
  name: 'Browser',
};
