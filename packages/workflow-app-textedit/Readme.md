# TextEdit workflow app

## Installation

```
npm i workflow-app-textedit
```

## Usage

```
import path from "path"
import TextEdit from 'workflow-app-textedit';

export default {
  name: 'workflow-example',
  type: 'workspace',
  children: [
    {
      type: 'layout',
      layout: 'splith',
      percent: 1.0,
      children: [
        {
          ...TextEdit,
          file: path.join(__dirname, 'index.js'),
          percent: 0.5,
        },
        {
          ...TextEdit,
          file: path.join(__dirname, 'index.tests.js'),
          percent: 0.5,
        },
      ],
    },
  ],
};
```
