# Angular frontend for workflow

This module contains bindings for [Angular](angular.io).

An example of a 50-50 spilt between a terminal and a text editor.

```typescript
import {NgModule, Component} from "@angular/core";
import {render, WorkflowPlatform, requireComponent, Workspace, SplitH} from "workflow-angular";

const {Terminal} = requireComponent("workflow-apps-defaults");
const Emacs = requireComponent("workflow-app-emacs");

@Component({
  selector: 'app',
  template:
  `Workflow [<workspace>
     [
       <splith>[
         <emacs percent=20 file="${__filename}"></emacs>,
         <xterm percent=80 cwd="${__dirname}"></xterm>
       ]</splith>
     ]
   </workspace>]`
})
class Workflow {}

@NgModule({
  imports: [WorkflowPlatform],
  declarations: [Workflow, Workspace, Emacs, Terminal, SplitH],
  bootstrap: [Workflow]
})
class WorkflowModule {}

export default render(WorkflowModule);
```

Use with `workflow-loader-typescript` to allow the flow files to be defined in TypeScript.

