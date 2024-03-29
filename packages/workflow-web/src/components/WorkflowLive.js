/* eslint-env commonjs */
import * as React from 'react';
import { WorkflowEditor } from './WorkflowEditor';
import { WorkflowPreview } from './WorkflowPreview';

const WorkflowCommand = ({ children }) => <div className="workflowCommand">{children}</div>;

export class WorkflowLive extends React.Component {
  render() {
    const { name, args } = this.props;

    // $FlowSuppress
    const code = require(`!raw-loader!../flows/${name}`);
    // $FlowSuppress
    const flow = require(`../flows/${name}`).default;

    return (
      <div>
        <div className="workflowWrapper">
          <WorkflowCommand>
            {'>'} workflow {name} {(args || []).join(' ')}
          </WorkflowCommand>
          <WorkflowEditor code={code} />
          <WorkflowPreview flow={flow} args={args} />
        </div>
      </div>
    );
  }
}
