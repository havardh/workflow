# workflow-transformer-async

## Installation

```
npm install workflow-transformer-async
```

Add the plugin to your `~/.workflow/config.js` file.

**Note:** The `WorkflowTransformerAsync` plugin must be the first transformer
in the list of `transformers` for the rest of the transformers to work properly.

```
import {WorkflowTranformerAsync} from "workflow-transformer-async";

export const config = {
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
