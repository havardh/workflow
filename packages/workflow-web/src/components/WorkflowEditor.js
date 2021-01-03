/* eslint-env browser */
import React from 'react';
import uuidv4 from 'uuid/v4';

export class WorkflowEditor extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuidv4();
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const editor = window.ace.edit(this.id);
    editor.setTheme('ace/theme/tomorrow');
    const JavaScriptMode = window.ace.require('ace/mode/jsx').Mode;
    editor.session.setMode(new JavaScriptMode());
  }

  render() {
    const { code } = this.props;

    return (
      <div id={this.id} className="workflowEditor">
        {code}
      </div>
    );
  }
}
