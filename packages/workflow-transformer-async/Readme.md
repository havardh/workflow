# workflow-transformer-async

## Installation

```
npm install workflow-transformer-async
```

Add the plugin to your `~/.workflow/config.js` file.

```
import WorkflowTranformerAsync from "workflow-transformer-async";

export default {
  transformers: [new WorkflowTranformerAsync()]
  ...
};
```

## Usage

```
import defaultBrowser from "default-browser"

export const DefaultBrowser = {
  type: "async",
  loader: async () => {
    const browserName = (await defaultBrowser()).name.toLowerCase();
    return require("workflow-app-" + browserName)
  }
}
```
