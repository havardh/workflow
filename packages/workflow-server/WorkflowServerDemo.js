/* eslint-env node */
import { join } from 'path';

import React from 'react';
import render, { Workspace, Layouts, Apps } from 'workflow-react';

const { SplitH } = Layouts;
const { Browser } = Apps.defaults;
const { Atom, Chrome } = Apps.linux;

async function seconds(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

class AtomWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: 'package.json' };
  }

  async componentDidMount() {
    await seconds(4);
    this.setState({ file: 'WorkflowServerDemo.js' });
    await seconds(2);
    this.setState({ file: 'package.json' });
  }

  render() {
    const { file } = this.state;
    const appId = '1';

    return <Atom percent={0.5} file={join(__dirname, file)} appId={appId} />;
  }
}

class ChromeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: 'https://google.com' };
  }

  async componentDidMount() {
    await seconds(4);
    this.setState({ url: 'https://github.com/havardh' });
    await seconds(2);
    this.setState({ url: 'https://github.com/havardh/workflow' });
  }

  render() {
    const { url } = this.state;
    const appId = '2';

    console.log(url);

    return <Chrome percent={0.5} url={url} appId={appId} />;
  }
}

export default render(
  <Workspace name={'workflow-server-demo'}>
    <SplitH percent={1}>
      <AtomWrapper percent={0.5} />
      <ChromeWrapper percent={0.5} />
    </SplitH>
  </Workspace>
);
