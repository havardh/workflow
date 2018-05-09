// @flow
/* eslint-env browser */
import React from "react";
import uuidv4 from "uuid/v4";
import {init} from "workflow-core";
import WorkflowTransformerApplyArgumentsToFields from "workflow-transformer-apply-arguments-to-fields";
import WorkflowWmHtml from "workflow-wm-html";

function dispatch(elem: Element, event) {
  elem.dispatchEvent(event);
  for (let child of (elem.children || [])) {
    dispatch(child, event);
  }
}

type Props = {
  flow: string,
  args: Array<string>,
};

class WorkflowPreview extends React.Component<Props> {
  id: string;
  workflow: { run: (flow: string, args: Array<string>) => void }

  constructor(props: Props) {
    super(props);
    this.id = uuidv4();
  }

  componentDidMount() {
    const container = document.getElementById(this.id);
    if (container) {
      this.workflow = init({
        resolvers: [{resolve: async (flow) => flow, alternatives: async () => ([])}],
        loader: {load: async(flow) => ({default: flow})},
        transformers: [new WorkflowTransformerApplyArgumentsToFields()],
        wm: new WorkflowWmHtml({container})
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

  update() {
    const container = document.getElementById(this.id);
    if (container) {
      const {flow, args} = this.props;

      const event = new Event("onremove");
      while (container.firstChild) {
        // $FlowSuppress
        dispatch(container.firstChild, event);
        // $FlowSuppress
        container.removeChild(container.firstChild);  
      }

      this.workflow.run(flow, args || []);
    } else {
      throw new Error(`Could not find container element with id ${this.id}`);
    }
  }

  render() {
    return (
      <div
        id={this.id}
        className="workflowPreview"

      />
    );
  }
}

export default WorkflowPreview;
