# Workflow apps defaults

The default apps collections for workflow. 

This collection contains a `Terminal`, `Text Editor`, and `Browser` for each 
platform. By writing flow files which depends on the applications in this package
the can be portable across platforms.

## Override

Each of the application can be overriden by the user. This is done by creating a 
file in `WORKFLOW_HOME/apps/defaults` which exports a default object with the 
overrides.

Example:
```
import {Chrome} from "workflow-app-chrome";

export default {
  Chrome
};
```
