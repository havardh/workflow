import {resolve} from "path";
import React from 'react';
import render, { Workspace, Layouts, requireComponent } from 'workflow-react';

const { SplitH, SplitV } = Layouts;

const Emacs = requireComponent("workflow-app-emacs");
const Terminal = requireComponent("workflow-app-terminal");
const Ssh = requireComponent("workflow-app-ssh");

export default render(
  <Workspace name="workflow-experiment">

    <SplitH percent={1}>

      <Emacs percent={0.5}>
        <SplitV>
          <Emacs.File file={__filename} />
          <Emacs.Plugins.Magit.Status />
        </SplitV>
      </Emacs>

      <Terminal percent={0.5}>
        <Ssh user={"havard"} host={"havardh.xyz"}>
          <Emacs>
            <SplitV>
              <Emacs.File file={"~/dev/index.html"} />
              <Emacs.File file={"~/apps/lists/start-client.js"} />
            </SplitV>
          </Emacs>
        </Ssh>
      </Terminal>

    </SplitH>

  </Workspace>
);
