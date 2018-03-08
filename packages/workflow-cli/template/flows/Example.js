/* eslint-env node */
const Code = {
  class: 'Code',
  open: ({ file }) => `code -n ${file}`,
};
const Chrome = {
  class: 'Google-chrome',
  open: ({ url }) => `google-chrome-stable --new-window ${url}`,
};

export default {
  name: 'workflow-example',
  root: {
    layout: 'splith',
    percent: 1.0,
    children: [
      { ...Chrome, url: 'github.com/havardh/workflow/tree/master/packages/workflow-cli', percent: 0.5 },
      { ...Code, file: __filename, percent: 0.5 },
    ],
  },
};
