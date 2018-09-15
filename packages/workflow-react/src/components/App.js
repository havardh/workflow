export class App {
  constructor(props) {
    const { nodeId } = props;
    this.props = { ...props, appId: nodeId, type: 'app' };
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }
}
