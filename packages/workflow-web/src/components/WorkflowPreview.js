// @flow
/* eslint-env browser */
import React from 'react';
import uuidv4 from 'uuid/v4';
import { workflow } from 'workflow-core';
import { WorkflowParserArguments } from 'workflow-parser-arguments';
import { WorkflowTransformerApplyArgumentsToFields } from 'workflow-transformer-apply-arguments-to-fields';
import { WorkflowLayout } from 'workflow-layout';
import { WorkflowWmHtml } from 'workflow-wm-html';

function dispatch(elem: Element, event) {
  elem.dispatchEvent(event);
  for (let child of elem.children || []) {
    dispatch(child, event);
  }
}

type Props = {
  flow: string,
  args: Array<string>,
};

type Screen = {
  top: number,
  left: number,
  width: number,
  height: number,
};

export class WorkflowPreview extends React.Component<Props> {
  id: string;
  workflow: {
    resolve: (path: string) => Promise<string>,
    alternatives: (path: string) => Array<string>,
    load: (path: string) => Promise<any>,
    parseArguments: (flow: any, argv: Array<string>) => Promise<any>,
    transform: (flow: any, args: any) => Promise<any>,
    layout: (flow: any, params: { screen: Screen }) => Promise<any>,
    screen: () => Promise<Screen>,
    apply: (flow: any) => Promise<void>,
  };

  constructor(props: Props) {
    super(props);
    this.id = uuidv4();
  }

  componentDidMount() {
    const container = document.getElementById(this.id);
    if (container) {
      this.workflow = workflow({
        transformers: [new WorkflowTransformerApplyArgumentsToFields()],
        argumentParser: new WorkflowParserArguments(),
        layout: new WorkflowLayout(),
        wm: new WorkflowWmHtml({ container }),
      });
    } else {
      throw new Error(`Could not find container element with id ${this.id}`);
    }

    this.update();

    window.onresize = () => this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  async run(flow: string, argv: Array<string>) {
    const { workflow } = this;

    const args = await workflow.parseArguments(flow, ['node', 'cli', ...argv]);
    flow = await workflow.transform(flow, { args });

    const screen = await workflow.screen();
    flow = await workflow.layout(flow, { screen });

    await workflow.apply(flow);
  }

  update() {
    const container = document.getElementById(this.id);
    if (container) {
      const { flow, args } = this.props;

      const event = new Event('onremove');
      while (container.firstChild) {
        // $FlowSuppress
        dispatch(container.firstChild, event);
        // $FlowSuppress
        container.removeChild(container.firstChild);
      }

      this.run(flow, args || []);
    } else {
      throw new Error(`Could not find container element with id ${this.id}`);
    }
  }

  render() {
    return <div id={this.id} className="workflowPreview" />;
  }
}
